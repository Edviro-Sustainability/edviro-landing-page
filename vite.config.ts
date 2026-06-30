import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// Type-only import to load vite-ssg's `ssgOptions` module augmentation on `vite`.
import type {} from 'vite-ssg'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Static-site-generation options consumed by `vite-ssg build`.
  ssgOptions: {
    // `nested` emits /faq/index.html so extensionless canonical URLs (/faq)
    // resolve on every static host.
    dirStyle: 'nested',
    formatting: 'minify',
  },
})
