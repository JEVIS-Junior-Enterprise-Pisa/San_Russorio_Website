import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/pages/*.html',
          dest: 'pages'
        },
        {
          src: 'src/assets/*',
          dest: 'assets'
        }
      ],
      // This hook will run after the copy operation
      hook: 'writeBundle'
    })
  ],
  server: {
    open: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    assetsInlineLimit: 0, // Prevents inlining of assets
    rollupOptions: {
      input: {
        main: 'index.html',
      }
    }
  }
})
