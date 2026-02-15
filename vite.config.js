import { resolve } from 'path';
import { defineConfig } from 'vite';
import { readdirSync, existsSync, cpSync } from 'fs';

const demosDir = resolve(__dirname, 'demos');
const entries = { main: resolve(__dirname, 'index.html') };

if (existsSync(demosDir)) {
  readdirSync(demosDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .forEach(d => {
      const html = resolve(demosDir, d.name, 'index.html');
      const marker = resolve(demosDir, d.name, '.vite-demo');
      if (existsSync(html) && existsSync(marker)) {
        entries[d.name] = html;
      }
    });
}

// Plugin to copy static assets (non-Vite demos, registry, shared, about) into dist/
function copyStaticAssets() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist');

      // Copy registry.json
      const registrySource = resolve(demosDir, 'registry.json');
      if (existsSync(registrySource)) {
        cpSync(registrySource, resolve(outDir, 'demos', 'registry.json'));
      }

      // Copy shared/ directory
      const sharedDir = resolve(__dirname, 'shared');
      if (existsSync(sharedDir)) {
        cpSync(sharedDir, resolve(outDir, 'shared'), { recursive: true });
      }

      // Copy about/ page
      const aboutDir = resolve(__dirname, 'about');
      if (existsSync(aboutDir)) {
        cpSync(aboutDir, resolve(outDir, 'about'), { recursive: true });
      }

      // Copy static demos (those WITHOUT .vite-demo marker)
      if (existsSync(demosDir)) {
        readdirSync(demosDir, { withFileTypes: true })
          .filter(d => d.isDirectory())
          .forEach(d => {
            const marker = resolve(demosDir, d.name, '.vite-demo');
            const html = resolve(demosDir, d.name, 'index.html');
            if (existsSync(html) && !existsSync(marker)) {
              cpSync(
                resolve(demosDir, d.name),
                resolve(outDir, 'demos', d.name),
                { recursive: true }
              );
            }
          });
      }

      console.log('✓ Copied static assets (registry, shared, about, static demos)');
    },
  };
}

export default defineConfig({
  root: __dirname,
  build: {
    rollupOptions: { input: entries },
    outDir: 'dist',
  },
  plugins: [copyStaticAssets()],
  server: {
    port: 5173,
    open: '/',
  },
});
