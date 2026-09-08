<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { BOOK_DEMO_PATH } from '@/seo/site'
</script>

<template>
  <!-- CTA -->
  <section style="padding: 80px 32px; background: var(--accent); color: #EDF0EE;">
    <div style="max-width: 820px; margin: 0 auto; width: 100%; text-align: center;">
      <h2 style="margin: 0; font-weight: 400; font-size: clamp(34px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.035em; color: #F2F5F1;">See what Edviro finds.</h2>
      <p style="margin: 20px auto 0; max-width: 540px; font-size: 18px; line-height: 1.55; color: rgba(237,240,238,0.78);">Connect your buildings. Find the problems. Close the loop.</p>
      <div style="margin-top: 30px; display: flex; justify-content: center;">
        <RouterLink :to="BOOK_DEMO_PATH" class="cta-btn" style="font-size: 16px; font-weight: 600; text-decoration: none; color: var(--accent); background: #EDF0EE; padding: 15px 34px; border-radius: 999px;">Book a demo</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-btn:hover {
  filter: brightness(1.06);
}
</style>
