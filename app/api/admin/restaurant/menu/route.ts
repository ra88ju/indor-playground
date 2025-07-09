import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import type { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const menuItems = await db.collection('menuItems').find({}).sort({ category: 1 }).toArray();
    return NextResponse.json(menuItems);
  } catch (error: any) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, category, available } = body;

    if (!name || !description || price === undefined || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json(
        { error: 'Invalid price' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const menuItem = {
      name,
      description,
      price,
      category,
      available: available ?? true,
      createdAt: new Date(),
    };
    const result = await db.collection('menuItems').insertOne(menuItem);

    return NextResponse.json({ ...menuItem, _id: result.insertedId }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, name, description, price, category, available } = body;

    if (!_id || !name || !description || price === undefined || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json(
        { error: 'Invalid price' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('menuItems').findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: { name, description, price, category, available: available ?? true } },
      { returnDocument: 'after' }
    );

    if (!result || !result.value) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.value);
  } catch (error: any) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'Menu item ID is required' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('menuItems').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Menu item deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}