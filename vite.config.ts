import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  // Use a root-relative public base. A relative base makes Vite 8 attempt to
  // emit the absolute HTML source path as an asset when the project path
  // contains non-ASCII characters.
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    compression({ algorithms: ['gzip', 'brotliCompress'] }),
  ],
  build: {
    cssCodeSplit: true,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/framer-motion/')) return 'motion'
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/react-router/') ||
            id.includes('/node_modules/react-router-dom/')
          ) {
            return 'react-vendor'
          }
        },
      },
    },
  },
})
