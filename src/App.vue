<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import hankenLatin from '@/assets/fonts/hanken-grotesk-300-latin.woff2'
import plexMonoLatin from '@/assets/fonts/ibm-plex-mono-400-latin.woff2'

// Theme / content configuration (defaults from the original design component).
const accentColor = '#1C3F33'

// Preload the primary latin font subsets (hashed URLs resolved by Vite) so the
// above-the-fold type renders without a flash. Applied on every route.
useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'preload', as: 'font', type: 'font/woff2', href: hankenLatin, crossorigin: 'anonymous' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: plexMonoLatin, crossorigin: 'anonymous' },
  ],
})
</script>

<template>
  <div
    style="font-family: 'Hanken Grotesk', system-ui, sans-serif; color: #1A1B14; background: #F4F2EC; min-height: 100vh; overflow-x: hidden;"
    :style="{ '--accent': accentColor }"
  >
    <SiteNav />
    <RouterView />
    <SiteFooter />
  </div>
</template>
