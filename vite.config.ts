import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));

// The host serves this repository root directly, so the build emits one flat
// bundle into js/ instead of a hashed dist/ tree.
export default defineConfig({
  root,
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'js',
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: false,
    // The vendored component styles are emitted as one extra sheet next to the bundle.
    lib: {
      entry: fileURLToPath(new URL('./src/main.tsx', import.meta.url)),
      formats: ['es'],
      fileName: () => 'app.js',
      cssFileName: 'react-bits',
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
