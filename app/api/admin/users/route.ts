import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock database
let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-02-20',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-02-19',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2024-02-15',
  },
];

// GET all users
export async function GET() {
  return NextResponse.json(users);
}

// POST new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role } = body;

    // Validate required fields
    if (!name || !email || !role) {
      return NextResponse.json(
        { error: 'Name, email, and role are required' },
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

    // Check if email already exists
    if (users.some(user => user.email === email)) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      role,
      status: 'Active',
      lastLogin: new Date().toISOString().split('T')[0],
    };

    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// PUT update user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, email, role, status } = body;

    // Validate required fields
    if (!id || !name || !email || !role || !status) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Find and update user
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is being changed and already exists
    if (email !== users[userIndex].email && users.some(u => u.email === email)) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
      role,
      status,
    };

    return NextResponse.json(users[userIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    users = users.filter(u => u.id !== id);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}