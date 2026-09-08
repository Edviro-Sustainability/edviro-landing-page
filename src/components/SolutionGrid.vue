<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  ASSETS_PATH,
  CAPITAL_PLANNING_PATH,
  FACILITIES_OPS_PATH,
  SCHOOL_ENERGY_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

/**
 * The five solutions a district buyer recognises, in plain language. Each card
 * links to its canonical destination with a descriptive anchor — never five
 * identical "Learn more" links. Labels name the destination and are kept to
 * ~19 characters so they sit on one line in the five-across grid (card text
 * width bottoms out around 166px at the 210px column minimum).
 */
const cards = [
  {
    title: 'Monitor energy',
    body: 'Track use, cost, and waste.',
    linkText: 'Energy management',
    to: SCHOOL_ENERGY_PATH,
  },
  {
    title: 'Diagnose problems',
    body: 'Find the likely cause.',
    linkText: 'How diagnosis works',
    to: { path: FACILITIES_OPS_PATH, hash: '#diagnostics' },
  },
  {
    title: 'Manage work orders',
    body: 'Assign, track, and verify.',
    linkText: 'Work-order system',
    to: WORK_ORDERS_PATH,
  },
  {
    title: 'Maintain assets',
    body: 'Keep history with the equipment.',
    linkText: 'Asset management',
    to: ASSETS_PATH,
  },
  {
    title: 'Plan capital',
    body: 'Turn failures into priorities.',
    linkText: 'Capital planning',
    to: CAPITAL_PLANNING_PATH,
  },
]
</script>

<template>
  <!-- SOLUTION GRID -->
  <section id="solutions" style="padding: 40px 32px 80px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div style="max-width: 680px; margin-bottom: 36px;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Solutions</p>
        <h2 style="margin: 0; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em;">One platform. Five jobs.</h2>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px;">
        <article
          v-for="(card, i) in cards"
          :key="card.title"
          style="display: flex; flex-direction: column; background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 18px; padding: 22px 20px 20px;"
        >
          <span style="display: inline-flex; width: 28px; height: 28px; border-radius: 8px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); align-items: center; justify-content: center; font-weight: 600; font-size: 12px; margin-bottom: 16px;">{{ i + 1 }}</span>
          <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: -0.01em;">{{ card.title }}</h3>
          <p style="margin: 0 0 18px; font-size: 15px; line-height: 1.45; color: #5F6B65; flex: 1;">{{ card.body }}</p>
          <RouterLink :to="card.to" class="card-link">
            <span class="card-link-text">{{ card.linkText }}</span>
            <span class="card-link-arrow" aria-hidden="true">→</span>
          </RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * Footer row: label left, arrow pinned to the right edge. If a label ever
 * wraps (narrow columns, large user font), the arrow stays on the right and
 * never orphans onto its own line; the hairline keeps all five footers
 * reading as one aligned band.
 */
.card-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid #ECEFEC;
  font-size: 14.5px;
  font-weight: 500;
  line-height: 1.3;
  color: var(--accent);
  text-decoration: none;
}
.card-link-arrow {
  flex: none;
  transition: transform 0.18s ease;
}
.card-link:hover .card-link-text,
.card-link:focus-visible .card-link-text {
  text-decoration: underline;
  text-underline-offset: 3px;
}
.card-link:hover .card-link-arrow,
.card-link:focus-visible .card-link-arrow {
  transform: translateX(3px);
}
</style>
