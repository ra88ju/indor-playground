import { NextResponse } from 'next/server';

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

// Mock data - replace with your database implementation
let slots: TimeSlot[] = [
  {
    id: 1,
    facilityId: 1,
    startTime: '09:00',
    endTime: '10:00',
    dayOfWeek: 'Monday',
    isAvailable: true,
    price: 50,
    maxBookings: 4,
    currentBookings: 0
  },
  {
    id: 2,
    facilityId: 1,
    startTime: '10:00',
    endTime: '11:00',
    dayOfWeek: 'Monday',
    isAvailable: true,
    price: 50,
    maxBookings: 4,
    currentBookings: 2
  }
];

// GET /api/admin/slots
export async function GET() {
  try {
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
    const newSlot: TimeSlot = {
      id: slots.length + 1,
      facilityId: data.facilityId,
      startTime: data.startTime,
      endTime: data.endTime,
      dayOfWeek: data.dayOfWeek,
      isAvailable: true,
      price: data.price,
      maxBookings: data.maxBookings,
      currentBookings: 0
    };

    slots.push(newSlot);
    return NextResponse.json(newSlot, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/admin/slots
export async function PUT(request: Request) {
  try {
    const data = await request.json();

    // Validate ID exists
    if (!data.id) {
      return NextResponse.json(
        { error: 'Missing slot ID' },
        { status: 400 }
      );
    }

    // Find slot
    const slotIndex = slots.findIndex(slot => slot.id === data.id);
    if (slotIndex === -1) {
      return NextResponse.json(
        { error: 'Slot not found' },
        { status: 404 }
      );
    }

    // Validate time format if provided
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    if (data.startTime && !timeRegex.test(data.startTime)) {
      return NextResponse.json(
        { error: 'Invalid start time format. Use HH:mm format (e.g., 09:00)' },
        { status: 400 }
      );
    }
    if (data.endTime && !timeRegex.test(data.endTime)) {
      return NextResponse.json(
        { error: 'Invalid end time format. Use HH:mm format (e.g., 09:00)' },
        { status: 400 }
      );
    }

    // Validate start time is before end time if both are provided
    if (data.startTime && data.endTime && data.startTime >= data.endTime) {
      return NextResponse.json(
        { error: 'Start time must be before end time' },
        { status: 400 }
      );
    }

    // Update slot
    slots[slotIndex] = {
      ...slots[slotIndex],
      ...data,
      id: slots[slotIndex].id // Ensure ID doesn't change
    };

    return NextResponse.json(slots[slotIndex]);
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

    const slotId = parseInt(id);
    const slotIndex = slots.findIndex(slot => slot.id === slotId);

    if (slotIndex === -1) {
      return NextResponse.json(
        { error: 'Slot not found' },
        { status: 404 }
      );
    }

    // Check if slot has current bookings
    if (slots[slotIndex].currentBookings > 0) {
      return NextResponse.json(
        { error: 'Cannot delete slot with active bookings' },
        { status: 400 }
      );
    }

    slots = slots.filter(slot => slot.id !== slotId);
    return NextResponse.json({ message: 'Slot deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}