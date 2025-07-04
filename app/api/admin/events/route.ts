import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock database
let events = [
  {
    id: 1,
    title: 'Summer Sports Camp',
    description: 'Two weeks of intensive sports training for kids aged 8-14',
    startDate: '2024-07-01',
    endDate: '2024-07-14',
    type: 'Camp',
    status: 'Upcoming',
    capacity: 50,
    registeredCount: 20,
    price: '$299',
    venue: 'Indoor Football Field',
  },
  {
    id: 2,
    title: 'Basketball Tournament',
    description: 'Annual inter-club basketball tournament',
    startDate: '2024-03-15',
    endDate: '2024-03-17',
    type: 'Tournament',
    status: 'Open',
    capacity: 100,
    registeredCount: 45,
    price: '$150',
    venue: 'Basketball Court',
  },
  {
    id: 3,
    title: 'Swimming Competition',
    description: 'Regional swimming championship',
    startDate: '2024-04-20',
    endDate: '2024-04-21',
    type: 'Competition',
    status: 'Open',
    capacity: 75,
    registeredCount: 30,
    price: '$75',
    venue: 'Swimming Pool',
  },
];

// GET all events
export async function GET() {
  return NextResponse.json(events);
}

// POST new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, startDate, endDate, type, capacity, price, venue } = body;

    // Validate required fields
    if (!title || !startDate || !endDate || !type || !capacity || !price || !venue) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Create new event
    const newEvent = {
      id: events.length + 1,
      title,
      description,
      startDate,
      endDate,
      type,
      status: 'Upcoming',
      capacity: parseInt(capacity.toString()),
      registeredCount: 0,
      price,
      venue,
    };

    events.push(newEvent);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

// PUT update event
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, startDate, endDate, type, status, capacity, price, venue } = body;

    // Validate required fields
    if (!id || !title || !startDate || !endDate || !type || !status || !capacity || !price || !venue) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Find and update event
    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex === -1) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    events[eventIndex] = {
      ...events[eventIndex],
      title,
      description,
      startDate,
      endDate,
      type,
      status,
      capacity: parseInt(capacity.toString()),
      price,
      venue,
    };

    return NextResponse.json(events[eventIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE event
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');

    if (!id) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex === -1) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check if event has registrations
    if (events[eventIndex].registeredCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete event with active registrations' },
        { status: 400 }
      );
    }

    events = events.filter(e => e.id !== id);
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}