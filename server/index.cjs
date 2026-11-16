/**
 * DigiBuddy4U Backend - Hostinger LiteSpeed CommonJS Startup Bridge
 *
 * Hostinger's LiteSpeed runner (/usr/local/lsws/fcgi-bin/lsnode.js) boots Node.js apps
 * using CommonJS `require()`. To prevent ERR_REQUIRE_ASYNC_MODULE on ESM graphs,
 * this bridge uses dynamic `import()` to load the ES Module server cleanly.
 */

const path = require('path');

// Pre-load dotenv if present in environment
try {
  require('dotenv').config({ path: path.resolve(__dirname, '.env') });
} catch (e) {
  // Ignore if dotenv is already bundled or unnecessary
}

console.log('[Hostinger Bridge] Starting DigiBuddy4U Backend via index.cjs...');

// Asynchronously load the ESM server
import('./src/server.js')
  .then((module) => {
    console.log('✅ [Hostinger Bridge] ES Module server graph loaded successfully.');
    if (module && module.app) {
      module.exports = module.app;
    }
  })
  .catch((err) => {
    console.error('❌ [Hostinger Bridge] Fatal error during ESM server startup:', err);
    process.exit(1);
  });
