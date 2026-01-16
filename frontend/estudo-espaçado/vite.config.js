import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configurações para produção
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Otimizações para produção
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
      },
    },
  },
  // Configurações do servidor de desenvolvimento
  server: {
    port: 5173,
    open: true,
  },
})
