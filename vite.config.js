import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  // base: '/winner/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    // https: [mkcert()]
  },
  preview: {
    port: 3000,
    // host: '0.0.0.0',
  },

  build: {
    outDir: 'dist', // Папка, куда будет собрана сборка
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]', // Кастомизация имен файлов
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
      },
    },
  },

  // Папка для статических файлов
  publicDir: 'public', // Указывает Vite, где находятся статические файлы
})
