import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET all users
export async function GET() {
  const { db } = await connectToDatabase();
  const users = await db.collection('users').find({}).toArray();
  return NextResponse.json(users);
}

// POST new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role } = body;

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: 'Name, email, and role are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    const newUser = {
      name,
      email,
      role,
      status: 'Active',
      lastLogin: new Date().toISOString().split('T')[0],
    };
    const result = await db.collection('users').insertOne(newUser);
    return NextResponse.json({ ...newUser, _id: result.insertedId }, { status: 201 });
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

    if (!id || !name || !email || !role || !status) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const userObjectId = new ObjectId(id);
    const user = await db.collection('users').findOne({ _id: userObjectId });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (email !== user.email) {
      const emailExists = await db.collection('users').findOne({ email });
      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        );
      }
    }

    await db.collection('users').updateOne(
      { _id: userObjectId },
      { $set: { name, email, role, status } }
    );
    const updatedUser = await db.collection('users').findOne({ _id: userObjectId });
    return NextResponse.json(updatedUser);
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
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    const { db } = await connectToDatabase();
    const userObjectId = new ObjectId(id);
    const result = await db.collection('users').deleteOne({ _id: userObjectId });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}