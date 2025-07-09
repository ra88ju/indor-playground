import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function POST(request: NextRequest) {
  console.log('Booking API called');
  try {
    const body = await request.json();
    console.log('Received body:', body);
    const { name, email, phone, sport, date, time, players, notes, paymentMethod } = body;

    // Validate required fields
    if (!name || !email || !phone || !sport || !date || !time || !players || !paymentMethod) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate players count
    if (players < 1) {
      return NextResponse.json(
        { error: 'Number of players must be at least 1' },
        { status: 400 }
      );
    }

    // Save booking to MongoDB
    const { db } = await connectToDatabase();
    const booking = {
      name,
      email,
      phone,
      sport,
      date,
      time,
      players,
      notes,
      paymentMethod,
      createdAt: new Date(),
    };
    const result = await db.collection('bookings').insertOne(booking);
    console.log('Booking inserted:', result.insertedId);

    return NextResponse.json(
      { message: 'Booking request submitted successfully', bookingId: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}