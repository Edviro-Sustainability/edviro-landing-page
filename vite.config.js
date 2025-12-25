import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages (project pages)
  // Change to '/' if using a custom domain or user/organization pages
  base: process.env.VITE_BASE_PATH || '/',
})
