import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateSeoArtifacts } from './scripts/generateSeo.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function digibuddySeoBuildPlugin() {
  return {
    name: 'digibuddy4u-seo-artifacts',
    closeBundle() {
      const { routesCount } = generateSeoArtifacts({ writeDistSnapshots: true });
      console.log(`✅ [SEO] Generated sitemap.xml, robots.txt, and ${routesCount} route snapshots in dist/`);
    },
  };
}

export default defineConfig({
  plugins: [react(), digibuddySeoBuildPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('react-dom') || id.includes(`${path.sep}react${path.sep}`) || id.includes('/react/')) {
              return 'vendor-react';
            }
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
