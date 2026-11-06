import app from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';
import { seedPackagesIfEmpty } from './controllers/packageController.js';
import { seedAddOnsIfEmpty } from './controllers/addonController.js';

async function startServer() {
  // Connect to Database
  await connectDB();

  // Auto-seed packages from PDF catalog if empty
  await seedPackagesIfEmpty();

  // Auto-seed add-ons catalog if empty
  await seedAddOnsIfEmpty();

  const PORT = ENV.PORT;
  const server = app.listen(PORT, () => {
    console.log(`🚀 DigiBuddy4U Backend Server running in ${ENV.NODE_ENV} mode on port ${PORT}`);
    console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });
}

startServer();
