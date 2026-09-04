<script setup lang="ts">
import { RouterLink } from 'vue-router'

const solutions = [
  {
    title: 'Energy monitoring',
    description: 'See utility, meter, weather, tariff, and building data together. Find waste without waiting for the next bill.',
    href: '/solutions/schools/',
  },
  {
    title: 'Diagnostics and alerts',
    description: 'Turn an unusual pattern into a likely cause, supporting evidence, and the next action—not another alert to triage.',
    href: '#loop',
  },
  {
    title: 'Work orders and maintenance',
    description: 'Create, assign, prioritize, and close work across trades and schools from Edviro, or connect your current CMMS.',
    href: '#work-orders',
  },
  {
    title: 'Assets and inspections',
    description: 'Keep equipment history, inspections, photos, and recurring failures attached to the work that happened.',
    href: '#work-orders',
  },
  {
    title: 'Capital planning',
    description: 'Use operating history to compare repair and replacement options and build a clearer case for capital projects.',
    href: '/capital-planning/',
  },
  {
    title: 'Measurement and verification',
    description: 'Measure results against a learned baseline and show what changed in language a board can understand.',
    href: '/measurement-and-verification/',
  },
]
</script>

<template>
  <section id="solutions" style="padding: 104px 32px; scroll-margin-top: 80px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div style="max-width: 760px;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">School facilities operations</p>
        <h2 style="margin: 0; font-weight: 400; font-size: clamp(34px, 4.6vw, 54px); line-height: 1.05; letter-spacing: -0.03em;">The daily work and the long-term plan, in one place.</h2>
        <p style="margin: 24px 0 0; max-width: 660px; font-size: 18px; line-height: 1.6; color: #4B5550;">Edviro helps school districts monitor energy, diagnose building problems, manage work orders and assets, and plan capital projects. Start with the problem that matters now; expand without rebuilding the stack later.</p>
      </div>
      <div class="r-cols-3" style="margin-top: 52px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <component
          :is="item.href.startsWith('/') ? RouterLink : 'a'"
          v-for="item in solutions"
          :key="item.title"
          :to="item.href.startsWith('/') ? item.href : undefined"
          :href="item.href.startsWith('#') ? item.href : undefined"
          class="solution-card"
          style="display: block; padding: 28px 26px; border: 1px solid #D8DED9; border-radius: 18px; background: #F9FAF9; color: inherit; text-decoration: none;"
        >
          <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: -0.01em;">{{ item.title }}</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.65; color: #5F6B65;">{{ item.description }}</p>
          <span style="display: inline-block; margin-top: 18px; color: var(--accent); font-size: 14px; font-weight: 600;">Learn more &rarr;</span>
        </component>
      </div>
      <div style="margin-top: 34px;">
        <RouterLink to="/solutions/school-facilities-operations/" class="pillar-link" style="display: inline-flex; align-items: center; gap: 8px; color: #171D1A; font-size: 15px; font-weight: 600; text-decoration: none; border-bottom: 1px solid #9AA69F; padding-bottom: 3px;">Explore school facilities operations &rarr;</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.solution-card { transition: transform 160ms ease, border-color 160ms ease; }
.solution-card:hover { transform: translateY(-2px); border-color: #9AA69F !important; }
.pillar-link:hover { border-color: #171D1A !important; }
</style>
