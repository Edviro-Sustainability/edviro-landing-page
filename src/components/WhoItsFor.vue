<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FACILITIES_OPS_PATH } from '@/seo/site'

const audiences = [
  {
    title: 'School facilities',
    body: 'Run energy, maintenance, assets, and capital planning from one record.',
    linkText: 'For school facilities',
    to: FACILITIES_OPS_PATH,
  },
  {
    title: 'Construction teams',
    body: 'Baseline and verify building performance from construction through handoff.',
    linkText: 'For construction',
    to: '/solutions/construction/',
  },
  {
    title: 'Data centers',
    body: 'Model cooling headroom and test capacity before adding load.',
    linkText: 'For data centers',
    to: '/solutions/data-centers/',
  },
]
</script>

<template>
  <section id="who" style="padding: 64px 32px 80px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div style="max-width: 680px; margin-bottom: 34px;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Who it's for</p>
        <h2 style="margin: 0; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em;">Built for operators.</h2>
      </div>

      <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
        <article v-for="audience in audiences" :key="audience.title" style="display: flex; flex-direction: column; border: 1px solid #D8DED9; border-radius: 16px; padding: 22px; background: #F9FAF9;">
          <h3 style="margin: 0 0 8px; font-size: 19px; font-weight: 600;">{{ audience.title }}</h3>
          <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.5; color: #5F6B65; flex: 1;">{{ audience.body }}</p>
          <RouterLink :to="audience.to" class="text-link" style="font-size: 14.5px; font-weight: 500; color: var(--accent); text-decoration: none;">{{ audience.linkText }} →</RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-link:hover,
.text-link:focus-visible {
  text-decoration: underline !important;
  text-underline-offset: 3px;
}
</style>
