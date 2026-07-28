import { ViteSSG } from 'vite-ssg'
import posthog from 'posthog-js'
import App from './App.vue'
import { routes } from './router'
import { POSTHOG_HOST, POSTHOG_KEY } from './seo/site'
import './assets/main.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, _from, savedPosition) {
      if (to.hash) {
        return { el: to.hash, top: 80, behavior: 'smooth' }
      }
      if (savedPosition) {
        return savedPosition
      }
      return { top: 0 }
    },
  },
  ({ isClient }) => {
    // vite-ssg also runs this module in Node at build time; PostHog is browser-only.
    if (isClient) {
      posthog.init(POSTHOG_KEY, { api_host: POSTHOG_HOST, defaults: '2026-01-30' })
    }
  },
)
