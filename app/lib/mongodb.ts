import { MongoClient, Db } from 'mongodb';

    const uri: string = process.env.MONGODB_URI || '';
    const dbName: string = process.env.MONGODB_DB || '';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req: any, res: any) {
  try {
    const { db } = await connectToDatabase();
    const data = await db.collection('your_collection').find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error processing booking:', error);
    res.status(500).json({ error: 'Database connection failed.' });
  }
}