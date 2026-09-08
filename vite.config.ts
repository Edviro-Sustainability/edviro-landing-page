import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// Type-only import to load vite-ssg's `ssgOptions` module augmentation on `vite`.
import type {} from 'vite-ssg'
import { BOOKING_URL, DEMO_REDIRECT_PATH, IUSD_DEMO_PATH, IUSD_DEMO_URL } from './src/seo/site'

/**
 * Emits Netlify's `_redirects` so vanity paths forward at the edge. Generated
 * rather than committed under public/ so src/seo/site.ts stays the only place
 * the target URLs are written.
 *
 * /demo forwards to the scheduler instead of loading the interstitial page;
 * /book-a-demo is a real page and fires the Google Ads conversion. The `!`
 * forces the rule, since Netlify's shadowing would otherwise serve the
 * prerendered /demo/index.html instead of redirecting.
 *
 * /iusd-sustainability-demo forwards to the IUSD community dashboard demo
 * (edviro-community-template on Cloudflare Workers). No prerendered page exists
 * there, so no `!` is needed; the splat rule keeps deep links working.
 *
 * /home is a legacy path that has no route (it would 404); 301 it to the
 * homepage so old links and any indexed copies consolidate on `/`.
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
        source:
          `${DEMO_REDIRECT_PATH}  ${BOOKING_URL}  302!\n` +
          `${IUSD_DEMO_PATH}  ${IUSD_DEMO_URL}  302\n` +
          `${IUSD_DEMO_PATH}/*  ${IUSD_DEMO_URL}/:splat  302\n` +
          `/home  /  301\n` +
          `/home/  /  301\n`,
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
    // `nested` emits /faq/index.html, which Netlify serves at /faq/ and
    // reaches by 301 from the slashless /faq. Canonical URLs therefore use
    // the trailing-slash form (canonicalUrl in src/seo/site.ts), matching
    // the redirect and the sitemap so all canonicalization signals agree.
    dirStyle: 'nested',
    formatting: 'minify',
  },
})
