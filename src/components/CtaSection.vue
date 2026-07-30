<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { BOOK_DEMO_PATH } from '@/seo/site'
</script>

<template>
  <!-- CTA -->
  <section style="padding: 100px 32px; background: var(--accent); color: #F4F2EC;">
    <div style="max-width: 820px; margin: 0 auto; width: 100%; text-align: center;">
      <h2 style="margin: 0; font-weight: 400; font-size: clamp(34px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.035em; color: #F8F7F1;">See what Edviro finds in your own buildings.</h2>
      <p style="margin: 24px auto 0; max-width: 560px; font-size: 18px; line-height: 1.6; color: rgba(244,242,236,0.78);">We'll connect a few of your sites and show you what it catches in the first week. No audit, no rip-and-replace.</p>
      <div style="margin-top: 34px; display: flex; justify-content: center;">
        <RouterLink :to="BOOK_DEMO_PATH" class="cta-btn" style="font-size: 16px; font-weight: 600; text-decoration: none; color: var(--accent); background: #F4F2EC; padding: 15px 34px; border-radius: 999px;">Book a demo</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-btn:hover {
  filter: brightness(1.06);
}
</style>
