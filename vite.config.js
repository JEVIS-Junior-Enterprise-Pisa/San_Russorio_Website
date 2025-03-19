import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    open: true, 
    port: 5173, 
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
  }
})