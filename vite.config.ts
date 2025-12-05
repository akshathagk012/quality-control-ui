import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Plugin to allow ngrok and other tunnel hosts
function allowNgrokHosts(): Plugin {
  return {
    name: 'allow-ngrok-hosts',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const host = req.headers.host || ''
        // Allow ngrok domains, localhost, and local network IPs
        if (
          host.includes('ngrok') ||
          host.includes('localhost') ||
          host.includes('127.0.0.1') ||
          host.includes('0.0.0.0') ||
          host.includes('172.29.240.1') ||
          host.includes('172.')
        ) {
          return next()
        }
        // For other hosts, still allow (permissive for development)
        next()
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), allowNgrokHosts()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Listen on all addresses (needed for ngrok and local network)
    port: 3006,
    strictPort: false,
    // HMR will use the same port as the server for local development
    // When using ngrok, set VITE_HMR_PORT=443 or configure ngrok to forward WebSocket
    proxy: {
      '/api': {
        target: 'https://qcb.xyz.in',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
