<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import SiteNav from './components/SiteNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import hankenLatin from '@/assets/fonts/hanken-grotesk-300-latin.woff2'

// Theme / content configuration (defaults from the original design component).
const accentColor = '#16493D'

// Preload the primary latin font subset (hashed URL resolved by Vite) so the
// above-the-fold type renders without a flash. Applied on every route.
useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'preload', as: 'font', type: 'font/woff2', href: hankenLatin, crossorigin: 'anonymous' },
  ],
})
</script>

<template>
  <div
    style="font-family: 'Hanken Grotesk', system-ui, sans-serif; color: #171D1A; background: #EDF0EE; min-height: 100vh; overflow-x: hidden;"
    :style="{ '--accent': accentColor }"
  >
    <SiteNav />
    <RouterView />
    <SiteFooter />
  </div>
</template>
