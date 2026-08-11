<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LiveDemo from './LiveDemo.vue'
import { BOOK_DEMO_PATH } from '@/seo/site'

defineProps<{ demoSpeed?: number }>()
</script>

<template>
  <!-- HERO -->
  <section id="top" style="position: relative; padding: 86px 32px 72px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div style="max-width: 860px; margin: 0 auto; text-align: center;">
        <p style="margin: 0 0 22px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">AI for building operations</p>
        <h1 style="margin: 0; font-weight: 400; font-size: clamp(40px, 6vw, 74px); line-height: 1.04; letter-spacing: -0.035em;">AI for the people who<br /><span style="color: var(--accent);">run the buildings</span>.</h1>
        <p style="margin: 26px auto 0; max-width: 620px; font-size: 19px; line-height: 1.6; color: #55564C;">Your bills, meters, BMS, and work orders live in different systems. Edviro pulls them into one place, catches waste as it starts, fixes it, and proves the savings on the bill.</p>
        <div style="margin-top: 34px; display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #F4F2EC; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</RouterLink>
          <a href="#loop" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #1A1B14; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #CFCBBD;">See how it works</a>
        </div>
        <div style="margin-top: 26px; display: flex; justify-content: center;">
          <a
            href="https://www.ycombinator.com/companies/edviro"
            target="_blank"
            rel="noopener noreferrer"
            style="display: inline-flex; align-items: center; gap: 9px; font-size: 13.5px; font-weight: 600; color: #1A1B14; background: #FFFFFF; border: 1px solid #E3E0D5; padding: 7px 15px 7px 9px; border-radius: 0; text-decoration: none;"
          >
            <span style="width: 19px; height: 19px; border-radius: 4px; background: #FB651E; color: #fff; font-weight: 700; font-size: 13px; display: inline-flex; align-items: center; justify-content: center; line-height: 1;">Y</span>
            Backed by Y Combinator
          </a>
        </div>
      </div>

      <LiveDemo :demo-speed="demoSpeed" />
    </div>
  </section>
</template>

<style scoped>
.book-btn:hover {
  filter: brightness(1.12);
}
.outline-btn:hover {
  border-color: #1a1b14 !important;
}
</style>
