import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = (client as any).db('indoorpark'); // cast to any to access db method
    const users = await db.collection('users').find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error('MongoDB Error:', error);
    res.status(500).json({ error: 'Failed to connect to database' });
  }
}
