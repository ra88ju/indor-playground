import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    // Fetch total users
    const totalUsers = await db.collection('users').countDocuments();
    // Fetch active bookings (example: all bookings, or filter by status if available)
    const activeBookings = await db.collection('bookings').countDocuments();
    // Fetch total facilities
    const facilities = await db.collection('facilities').countDocuments();
    // Calculate revenue (sum of all order totals)
    const orders = await db.collection('orders').find({}).toArray();
    const revenue = orders.reduce((sum: number, order: any) => {
      const total = Number(order.total);
      return sum + (isNaN(total) ? 0 : total);
    }, 0);

    // Optionally, fetch recent activities (last 5 bookings, users, or orders)
    const recentBookings = await db.collection('bookings')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    const recentUsers = await db.collection('users')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    const recentOrders = await db.collection('orders')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    // Combine recent activities (example: just bookings, or merge all types)
    const recentActivities = [
      ...recentBookings.map(b => ({
        type: 'booking',
        description: `Booking for ${b.sport || 'facility'}`,
        time: b.createdAt,
        user: b.name || b.email,
      })),
      ...recentUsers.map(u => ({
        type: 'user',
        description: `New user: ${u.name || u.email}`,
        time: u.createdAt,
        user: u.name || u.email,
      })),
      ...recentOrders.map(o => ({
        type: 'order',
        description: `Order placed: ${o.item?.name || 'item'}`,
        time: o.createdAt,
        user: o.customerName || o._id,
      })),
    ].sort((a, b) => {
      const aTime = a.time ? new Date(a.time).getTime() : 0;
      const bTime = b.time ? new Date(b.time).getTime() : 0;
      return bTime - aTime;
    }).slice(0, 5);

    return NextResponse.json({
      stats: {
        totalUsers: { value: totalUsers, change: '' },
        activeBookings: { value: activeBookings, change: '' },
        facilities: { value: facilities, change: '' },
        revenue: { value: revenue, change: '' },
      },
      recentActivities,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    const result = await db.collection('COLLECTION_NAME').insertOne(body);
    return NextResponse.json(
      { message: 'Created successfully', id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating data:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}