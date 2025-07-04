import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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

    // Here you would typically:
    // 1. Save booking to database
    // 2. Send confirmation email
    // 3. Process payment
    // 4. Update availability
    
    console.log('Booking request:', { 
      name, 
      email, 
      phone, 
      sport, 
      date, 
      time, 
      players, 
      notes, 
      paymentMethod 
    });

    return NextResponse.json(
      { message: 'Booking request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}