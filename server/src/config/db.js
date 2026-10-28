import mongoose from 'mongoose';
import { ENV } from './env.js';
import { seedInitialData } from '../utils/seed.js';

let isConnected = false;
let memoryServer = null;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  const uri = ENV.MONGODB_URI;
  const isPlaceholder = uri.includes('<db_username>') || uri.includes('<DB_USERNAME>');

  if (!isPlaceholder) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      isConnected = true;
      console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host} / ${conn.connection.name}`);
      return;
    } catch (error) {
      console.error(`❌ MongoDB Atlas Connection Error: ${error.message}`);
      console.warn('👉 Switching to local development database fallback...');
    }
  } else {
    console.warn('\n⚠️ [Atlas Notice]: Your MONGODB_URI in server/.env currently has the placeholder "<db_username>".');
    console.warn('👉 Switching to automated development database fallback so you can log in immediately...\n');
  }

  // Fallback: Start in-memory MongoDB instance for seamless instant local development
  try {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    const fallbackUri = memoryServer.getUri();

    const conn = await mongoose.connect(fallbackUri);
    isConnected = true;
    console.log(`🚀 Development Database Online: ${fallbackUri}`);

    // Auto-seed initial admin and website data
    await seedInitialData();
    console.log('✨ Seeded initial admin account (admin@digibuddy4u.com) & marketing services into development database.');
  } catch (err) {
    console.error('❌ Failed to start local development database:', err.message);
  }
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

export function checkDbConnection(req, res, next) {
  if (!isDbConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database connection not ready. Please check server logs.',
    });
  }
  next();
}
