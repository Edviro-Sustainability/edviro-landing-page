<script setup lang="ts">
import type { FaqItem } from '@/seo/jsonld'

defineProps<{ items: FaqItem[]; heading?: string; eyebrow?: string }>()
</script>

<template>
  <section style="padding: 30px 32px 100px; scroll-margin-top: 80px;" id="faq">
    <div style="max-width: 820px; margin: 0 auto; width: 100%;">
      <p v-if="eyebrow" style="margin: 0 0 18px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">{{ eyebrow }}</p>
      <h2 v-if="heading" style="margin: 0 0 40px; font-weight: 400; font-size: clamp(30px, 4vw, 46px); line-height: 1.06; letter-spacing: -0.03em;">{{ heading }}</h2>
      <dl style="margin: 0; border-top: 1px solid #E3E0D5;">
        <div v-for="item in items" :key="item.question" style="padding: 26px 0; border-bottom: 1px solid #E3E0D5;">
          <dt style="margin: 0 0 10px; font-size: 19px; font-weight: 600; letter-spacing: -0.01em; color: #1A1B14;">{{ item.question }}</dt>
          <dd style="margin: 0; font-size: 16px; line-height: 1.62; color: #55564C;">{{ item.answer }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
