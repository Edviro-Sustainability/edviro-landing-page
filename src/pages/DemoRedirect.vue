<script setup lang="ts">
import { onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { BOOKING_URL, DEMO_REDIRECT_PATH } from '@/seo/site'

usePageSeo({
  title: 'Book a demo',
  description: 'Pick a time for a 30-minute Edviro demo.',
  path: DEMO_REDIRECT_PATH,
  noindex: true,
})

// The meta refresh is prerendered into the static HTML, so the redirect still
// happens for crawlers and with JavaScript disabled.
useHead({
  meta: [{ 'http-equiv': 'refresh', content: `0; url=${BOOKING_URL}` }],
})

onMounted(() => {
  // replace() keeps the interstitial out of the back-button history.
  window.location.replace(BOOKING_URL)
})
</script>

<template>
  <main style="padding: 140px 32px; min-height: 60vh;">
    <div style="max-width: 560px; margin: 0 auto; text-align: center;">
      <p style="margin: 0 0 18px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">Book a demo</p>
      <h1 style="margin: 0; font-weight: 400; font-size: clamp(30px, 4.4vw, 44px); line-height: 1.06; letter-spacing: -0.03em;">Taking you to our scheduling page.</h1>
      <p style="margin: 22px auto 0; max-width: 440px; font-size: 17px; line-height: 1.6; color: #55564C;">If nothing happens in a moment, use the link below.</p>
      <div style="margin-top: 28px;">
        <a :href="BOOKING_URL" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #F4F2EC; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Pick a time</a>
      </div>
    </div>
  </main>
</template>

<style scoped>
.book-btn:hover {
  filter: brightness(1.12);
}
</style>
