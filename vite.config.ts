import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // <‑‑ NEW
      '@actions': path.resolve(__dirname, 'src/actions'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@reduxStore': path.resolve(__dirname, 'src/reduxStore'),
      '@types': path.resolve(__dirname, 'src/types')
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})