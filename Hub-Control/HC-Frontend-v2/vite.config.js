import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  server: {
    port: 5173, // Default Vite port
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Spring Boot Backend
        changeOrigin: true,
        secure: false,
        // IMPORTANT: We do NOT use 'rewrite' here because your 
        // Backend Controller is mapped to "/api/auth", so we want 
        // to keep the "/api" prefix in the forwarded request.
      }
    }
  }
})