/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@domains': path.resolve(__dirname, './src/domains'),
    },
  },
  plugins: [react()],
  define: {
    SC_DISABLE_SPEEDY: 'true', // needed to enable vendor prefixing using 'vite build'
  },
  build: {
    chunkSizeWarningLimit: 1000, // øker størrelsesbegrensningen (i KB)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'styled-components'],
          charts: [
            './src/components/ForbruksGrapf.jsx',
            './src/components/GanttTidslinje.jsx',
          ],
          utils: ['./src/utils/startdata.js', './src/utils/ganttConfig.js'],
        },
      },
    },
  },
})
