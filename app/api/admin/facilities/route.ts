import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock database
let facilities = [
  {
    id: 1,
    name: 'Indoor Football',
    status: 'Active',
    capacity: 20,
    price: '$50/hour',
    lastUpdated: '2024-02-20',
  },
  {
    id: 2,
    name: 'Basketball Court',
    status: 'Maintenance',
    capacity: 30,
    price: '$60/hour',
    lastUpdated: '2024-02-19',
  },
  {
    id: 3,
    name: 'Swimming Pool',
    status: 'Active',
    capacity: 50,
    price: '$100/hour',
    lastUpdated: '2024-02-18',
  },
];

// GET all facilities
export async function GET() {
  return NextResponse.json(facilities);
}

// POST new facility
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, status, capacity, price } = body;

    // Validate required fields
    if (!name || !status || !capacity || !price) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create new facility
    const newFacility = {
      id: facilities.length + 1,
      name,
      status,
      capacity,
      price,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    facilities.push(newFacility);
    return NextResponse.json(newFacility, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create facility' },
      { status: 500 }
    );
  }
}

// PUT update facility
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, status, capacity, price } = body;

    // Validate required fields
    if (!id || !name || !status || !capacity || !price) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Find and update facility
    const facilityIndex = facilities.findIndex(f => f.id === id);
    if (facilityIndex === -1) {
      return NextResponse.json(
        { error: 'Facility not found' },
        { status: 404 }
      );
    }

    facilities[facilityIndex] = {
      ...facilities[facilityIndex],
      name,
      status,
      capacity,
      price,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    return NextResponse.json(facilities[facilityIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update facility' },
      { status: 500 }
    );
  }
}

// DELETE facility
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');

    if (!id) {
      return NextResponse.json(
        { error: 'Facility ID is required' },
        { status: 400 }
      );
    }

    const facilityIndex = facilities.findIndex(f => f.id === id);
    if (facilityIndex === -1) {
      return NextResponse.json(
        { error: 'Facility not found' },
        { status: 404 }
      );
    }

    facilities = facilities.filter(f => f.id !== id);
    return NextResponse.json({ message: 'Facility deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete facility' },
      { status: 500 }
    );
  }
}