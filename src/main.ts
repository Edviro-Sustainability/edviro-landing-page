import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
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
)
