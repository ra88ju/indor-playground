import { NextResponse } from 'next/server';

const facilities = [
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
  {
    id: 4,
    name: 'Tennis Court',
    status: 'Active',
    capacity: 4,
    price: '$40/hour',
    lastUpdated: '2024-02-17',
  },
];

export async function GET() {
  return NextResponse.json(facilities);
} 