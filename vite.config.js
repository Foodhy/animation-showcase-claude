import { resolve } from 'path';
import { defineConfig } from 'vite';
import { readdirSync, existsSync } from 'fs';

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

export default defineConfig({
  root: __dirname,
  build: {
    rollupOptions: { input: entries },
    outDir: 'dist',
  },
  server: {
    port: 5173,
    open: '/',
  },
});
