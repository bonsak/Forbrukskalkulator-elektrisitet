/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  test: {
    environment: 'node',
  },
  base: '',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@context': path.resolve(__dirname, './src/context'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@domains': path.resolve(__dirname, './src/domains'),
    },
  },
  plugins: [react(), svgr()],
  define: {
    SC_DISABLE_SPEEDY: 'true', // needed to enable vendor prefixing using 'vite build'
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
