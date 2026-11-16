import app from './app.js';
import { connectDB, isDbConnected } from './config/db.js';
import { ENV } from './config/env.js';
import { seedPackagesIfEmpty } from './controllers/packageController.js';
import { seedAddOnsIfEmpty } from './controllers/addonController.js';

async function startServer() {
  const PORT = process.env.PORT || ENV.PORT || 5000;

  // 1. Start HTTP Server immediately so LiteSpeed / Hostinger detects active port binding
  const server = app.listen(PORT, () => {
    console.log(`🚀 DigiBuddy4U Backend Server running in ${ENV.NODE_ENV} mode on port ${PORT}`);
    console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
  });

  // 2. Connect to Database asynchronously without blocking server port listening
  try {
    await connectDB();
    if (isDbConnected()) {
      await seedPackagesIfEmpty().catch((err) => console.warn('Package seed error:', err.message));
      await seedAddOnsIfEmpty().catch((err) => console.warn('Addon seed error:', err.message));
    }
  } catch (dbErr) {
    console.error('Database connection notice:', dbErr.message);
  }

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });

  return server;
}

const serverPromise = startServer();

export default serverPromise;
export { app, startServer };
