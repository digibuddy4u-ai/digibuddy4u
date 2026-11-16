import mongoose from 'mongoose';
import { ENV } from './env.js';
import { seedInitialData } from '../utils/seed.js';

let isConnected = false;
let memoryServer = null;

export async function connectDB() {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  const uri = ENV.MONGODB_URI;
  const isPlaceholder =
    !uri ||
    uri.includes('<db_username>') ||
    uri.includes('<DB_USERNAME>') ||
    uri.includes('<db_password>') ||
    uri.includes('<DB_PASSWORD>');

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
      if (ENV.NODE_ENV === 'production') {
        console.warn('⚠️ Server running with MongoDB offline. Verify Atlas IP whitelist (0.0.0.0/0) and credentials in Hostinger .env');
        return;
      }
      console.warn('👉 Switching to local development database fallback...');
    }
  } else {
    if (ENV.NODE_ENV === 'production') {
      console.warn('⚠️ MONGODB_URI not configured or contains placeholder in production.');
      return;
    }
    console.warn('\n⚠️ [Atlas Notice]: Your MONGODB_URI in server/.env currently has placeholders.');
    console.warn('👉 Switching to automated development database fallback so you can log in immediately...\n');
  }

  // Fallback: Start in-memory MongoDB instance ONLY in development / test
  if (ENV.NODE_ENV !== 'production') {
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
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

export function checkDbConnection(req, res, next) {
  if (!isDbConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database connection not ready. Please verify MONGODB_URI and MongoDB Atlas network access.',
    });
  }
  next();
}
