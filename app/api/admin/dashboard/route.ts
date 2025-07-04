import { NextResponse } from 'next/server';

// Mock data - Replace with actual database queries
const getDashboardStats = async () => {
  return {
    totalUsers: 2543,
    activeBookings: 45,
    facilities: 12,
    revenue: 12345,
    changes: {
      users: '+12.3%',
      bookings: '+5.4%',
      facilities: '+2',
      revenue: '+8.2%',
    },
  };
};

const getRecentActivities = async () => {
  return [
    {
      id: 1,
      type: 'booking',
      description: 'New booking for Indoor Football',
      time: '5 minutes ago',
      userId: 'user123',
      entityId: 'booking123',
    },
    {
      id: 2,
      type: 'user',
      description: 'New user registration',
      time: '10 minutes ago',
      userId: 'user124',
      entityId: null,
    },
    {
      id: 3,
      type: 'payment',
      description: 'Payment received for Event Booking',
      time: '15 minutes ago',
      userId: 'user125',
      entityId: 'payment123',
    },
    {
      id: 4,
      type: 'facility',
      description: 'Facility status updated',
      time: '20 minutes ago',
      userId: 'user126',
      entityId: 'facility123',
    },
  ];
};

export async function GET() {
  try {
    const [stats, activities] = await Promise.all([
      getDashboardStats(),
      getRecentActivities(),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers: {
          value: stats.totalUsers,
          change: stats.changes.users,
        },
        activeBookings: {
          value: stats.activeBookings,
          change: stats.changes.bookings,
        },
        facilities: {
          value: stats.facilities,
          change: stats.changes.facilities,
        },
        revenue: {
          value: stats.revenue,
          change: stats.changes.revenue,
        },
      },
      recentActivities: activities,
    });
  } catch (error: any) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}