import { NextResponse } from 'next/server';

interface ReportData {
  id: number;
  type: string;
  title: string;
  dateRange: {
    start: string;
    end: string;
  };
  data: any;
  createdAt: string;
  status: string;
}

// Mock data - replace with your database implementation
let reports: ReportData[] = [
  {
    id: 1,
    type: 'bookings',
    title: 'Monthly Bookings Report',
    dateRange: {
      start: '2024-01-01',
      end: '2024-01-31'
    },
    data: {
      totalBookings: 156,
      totalRevenue: 7800,
      popularFacilities: [
        { name: 'Tennis Court 1', bookings: 45 },
        { name: 'Basketball Court', bookings: 38 },
        { name: 'Swimming Pool', bookings: 32 }
      ],
      dailyStats: [
        { date: '2024-01-01', bookings: 5, revenue: 250 },
        { date: '2024-01-02', bookings: 7, revenue: 350 },
        // ... more daily stats
      ]
    },
    createdAt: '2024-01-31T23:59:59Z',
    status: 'completed'
  },
  {
    id: 2,
    type: 'facilities',
    title: 'Facility Usage Analysis',
    dateRange: {
      start: '2024-01-01',
      end: '2024-01-31'
    },
    data: {
      totalHoursBooked: 780,
      utilizationRate: 85,
      maintenanceHours: 24,
      facilityStats: [
        { name: 'Tennis Court 1', utilization: 90, revenue: 2250 },
        { name: 'Basketball Court', utilization: 85, revenue: 1900 },
        { name: 'Swimming Pool', utilization: 80, revenue: 1600 }
      ]
    },
    createdAt: '2024-01-31T23:59:59Z',
    status: 'completed'
  }
];

// GET /api/admin/reports
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let filteredReports = [...reports];

    // Apply filters if provided
    if (type) {
      filteredReports = filteredReports.filter(report => report.type === type);
    }
    if (startDate) {
      filteredReports = filteredReports.filter(
        report => report.dateRange.start >= startDate
      );
    }
    if (endDate) {
      filteredReports = filteredReports.filter(
        report => report.dateRange.end <= endDate
      );
    }

    return NextResponse.json(filteredReports);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/reports
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = ['type', 'title', 'dateRange'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate date range
    if (!data.dateRange.start || !data.dateRange.end) {
      return NextResponse.json(
        { error: 'Date range must include start and end dates' },
        { status: 400 }
      );
    }

    if (data.dateRange.start > data.dateRange.end) {
      return NextResponse.json(
        { error: 'Start date must be before end date' },
        { status: 400 }
      );
    }

    // Create new report
    const newReport: ReportData = {
      id: reports.length + 1,
      type: data.type,
      title: data.title,
      dateRange: data.dateRange,
      data: null, // Will be populated when report generation is complete
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Generate report data based on type
    // This would typically be an async operation
    switch (data.type) {
      case 'bookings':
        newReport.data = {
          totalBookings: Math.floor(Math.random() * 200),
          totalRevenue: Math.floor(Math.random() * 10000),
          popularFacilities: [
            { name: 'Tennis Court 1', bookings: Math.floor(Math.random() * 50) },
            { name: 'Basketball Court', bookings: Math.floor(Math.random() * 50) },
            { name: 'Swimming Pool', bookings: Math.floor(Math.random() * 50) }
          ]
        };
        break;
      case 'facilities':
        newReport.data = {
          totalHoursBooked: Math.floor(Math.random() * 1000),
          utilizationRate: Math.floor(Math.random() * 100),
          maintenanceHours: Math.floor(Math.random() * 50),
          facilityStats: [
            {
              name: 'Tennis Court 1',
              utilization: Math.floor(Math.random() * 100),
              revenue: Math.floor(Math.random() * 3000)
            },
            {
              name: 'Basketball Court',
              utilization: Math.floor(Math.random() * 100),
              revenue: Math.floor(Math.random() * 3000)
            },
            {
              name: 'Swimming Pool',
              utilization: Math.floor(Math.random() * 100),
              revenue: Math.floor(Math.random() * 3000)
            }
          ]
        };
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid report type' },
          { status: 400 }
        );
    }

    newReport.status = 'completed';
    reports.push(newReport);

    return NextResponse.json(newReport, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/admin/reports
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing report ID' },
        { status: 400 }
      );
    }

    const reportId = parseInt(id);
    const reportIndex = reports.findIndex(report => report.id === reportId);

    if (reportIndex === -1) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    reports = reports.filter(report => report.id !== reportId);
    return NextResponse.json({ message: 'Report deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}