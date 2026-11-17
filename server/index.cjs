/**
 * DigiBuddy4U Backend - Hostinger LiteSpeed CommonJS Startup Bridge
 *
 * LiteSpeed's runner (/usr/local/lsws/fcgi-bin/lsnode.js) boots Node.js apps
 * using CommonJS `require()`. To prevent ERR_REQUIRE_ASYNC_MODULE on ESM graphs,
 * this bridge loads environment variables and imports the ESM server via dynamic `import()`.
 */

const path = require('path');

// Safely load environment variables from server/.env if present
try {
  require('dotenv').config({
    path: path.resolve(__dirname, '.env'),
  });
} catch (e) {
  // Ignore if dotenv is omitted or already loaded by environment
}

console.log('[Hostinger] Starting DigiBuddy4U...');

// Dynamically import the ES Module server
import('./src/server.js').catch((err) => {
  console.error('Backend startup failed:', err);
  process.exit(1);
});
