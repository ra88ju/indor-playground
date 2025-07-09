import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import type { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';

interface TimeSlot {
  id: number;
  facilityId: number;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  isAvailable: boolean;
  price: number;
  maxBookings: number;
  currentBookings: number;
}

// GET /api/admin/slots
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const slots = await db.collection('slots').find({}).toArray();
    return NextResponse.json(slots);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/slots
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Validate required fields
    const requiredFields = ['facilityId', 'startTime', 'endTime', 'dayOfWeek', 'price', 'maxBookings'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    // Validate time format (HH:mm)
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(data.startTime) || !timeRegex.test(data.endTime)) {
      return NextResponse.json(
        { error: 'Invalid time format. Use HH:mm format (e.g., 09:00)' },
        { status: 400 }
      );
    }
    // Validate start time is before end time
    if (data.startTime >= data.endTime) {
      return NextResponse.json(
        { error: 'Start time must be before end time' },
        { status: 400 }
      );
    }
    // Create new slot
    const newSlot = {
      facilityId: data.facilityId,
      startTime: data.startTime,
      endTime: data.endTime,
      dayOfWeek: data.dayOfWeek,
      isAvailable: true,
      price: data.price,
      maxBookings: data.maxBookings,
      currentBookings: 0,
      createdAt: new Date(),
    };
    const { db } = await connectToDatabase();
    const result = await db.collection('slots').insertOne(newSlot);
    return NextResponse.json({ ...newSlot, _id: result.insertedId }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/admin/slots
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data._id) {
      return NextResponse.json(
        { error: 'Missing slot ID (_id)' },
        { status: 400 }
      );
    }
    const { db } = await connectToDatabase();
    const { _id, ...updateData } = data;
    // Validate time format if provided
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (updateData.startTime && !timeRegex.test(updateData.startTime)) {
      return NextResponse.json(
        { error: 'Invalid start time format. Use HH:mm format (e.g., 09:00)' },
        { status: 400 }
      );
    }
    if (updateData.endTime && !timeRegex.test(updateData.endTime)) {
      return NextResponse.json(
        { error: 'Invalid end time format. Use HH:mm format (e.g., 09:00)' },
        { status: 400 }
      );
    }
    if (updateData.startTime && updateData.endTime && updateData.startTime >= updateData.endTime) {
      return NextResponse.json(
        { error: 'Start time must be before end time' },
        { status: 400 }
      );
    }
    const { ObjectId } = await import('mongodb');
    const result = await db.collection('slots').findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    if (!result || !result.value) {
      return NextResponse.json(
        { error: 'Slot not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(result.value);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/slots
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Missing slot ID' },
        { status: 400 }
      );
    }
    const { db } = await connectToDatabase();
    const { ObjectId } = await import('mongodb');
    const slot = await db.collection('slots').findOne({ _id: new ObjectId(id) });
    if (!slot) {
      return NextResponse.json(
        { error: 'Slot not found' },
        { status: 404 }
      );
    }
    if (slot.currentBookings > 0) {
      return NextResponse.json(
        { error: 'Cannot delete slot with active bookings' },
        { status: 400 }
      );
    }
    await db.collection('slots').deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: 'Slot deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}