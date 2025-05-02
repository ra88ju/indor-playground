import { NextResponse } from 'next/server';
import { PrismaClient as PrismaClientType } from '.prisma/client';
import { format } from 'date-fns';

interface PaymentResult {
  success: boolean;
  transactionId: string;
}

const prisma = new PrismaClientType();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { facilityId, date, timeSlot, paymentMethod, amount } = body;

    // Check if the time slot is available
    const existingBooking = await prisma.booking.findFirst({
      where: {
        facilityId,
        date: new Date(date),
        timeSlot,
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'This time slot is already booked' },
        { status: 400 }
      );
    }

    // Process payment (integrate with your payment gateway here)
    // This is a placeholder for the payment processing logic
    const paymentResult = await processPayment(paymentMethod, amount) as PaymentResult;

    if (!paymentResult.success) {
      return NextResponse.json(
        { error: 'Payment failed' },
        { status: 400 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        facilityId,
        date: new Date(date),
        timeSlot,
        paymentMethod,
        paymentStatus: 'completed',
        amount: parseFloat(amount),
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    );
  }
}

// Placeholder function for payment processing
async function processPayment(paymentMethod: string, amount: string) {
  // Integrate with your preferred payment gateway here
  // This is just a mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, transactionId: 'mock_transaction_id' });
    }, 1000);
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const facilityId = searchParams.get('facilityId');
  const date = searchParams.get('date');

  if (!facilityId || !date) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        facilityId,
        date: new Date(date),
      },
      select: {
        timeSlot: true,
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
} 