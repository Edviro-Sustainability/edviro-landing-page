import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// Type-only import to load vite-ssg's `ssgOptions` module augmentation on `vite`.
import type {} from 'vite-ssg'
import { BOOKING_URL, DEMO_REDIRECT_PATH } from './src/seo/site'

/**
 * Emits Netlify's `_redirects` so /demo forwards to the scheduler at the edge
 * instead of loading the interstitial page. Generated rather than committed under
 * public/ so BOOKING_URL stays the only place the scheduler URL is written.
 *
 * Only /demo is redirected: /book-a-demo is a real page and fires the Google Ads
 * conversion. The `!` forces the rule, since Netlify's shadowing would otherwise
 * serve the prerendered /demo/index.html instead of redirecting.
 */
function netlifyRedirects(): Plugin {
  let isSsrBuild = false
  return {
    name: 'edviro:netlify-redirects',
    apply: 'build',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr)
    },
    generateBundle() {
      // vite-ssg runs a second, SSR build into a temp dir; only the client build
      // writes to the publish directory Netlify reads.
      if (isSsrBuild) return
      this.emitFile({
        type: 'asset',
        fileName: '_redirects',
        source: `${DEMO_REDIRECT_PATH}  ${BOOKING_URL}  302!\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    netlifyRedirects(),
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
