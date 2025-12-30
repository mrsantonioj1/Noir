import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map the Google Generative AI import to our local stub when running in this
      // environment. In production, you should install the actual package and
      // remove this alias.
      '@google/generative-ai': resolve(__dirname, 'src/stubs/generative-ai.ts'),
    },
  },
  server: {
    port: 5173,
  },
});
