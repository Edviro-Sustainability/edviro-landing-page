<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ASSETS_PATH, CAPITAL_PLANNING_PATH, MV_PATH } from '@/seo/site'

const highlights = [
  { title: 'Asset history', body: 'Age, service, and inspections.' },
  { title: 'Repair or replace', body: 'Failure and cost history behind the call.' },
  { title: 'Capital plan', body: 'Priorities, owners, funding, and budgets.' },
  { title: 'Verified result', body: 'What changed, what it cost, and whether it held.' },
]
</script>

<template>
  <!-- ASSETS, CAPITAL PLANNING, AND MEASUREMENT AND VERIFICATION -->
  <section id="planning" style="position: relative; padding: 80px 32px; background: #101815; color: #EDF0EE;">
    <!-- Preserve the former deep link after folding VisibilityMV into this section. -->
    <span id="mv" aria-hidden="true" style="position: absolute; top: 0; left: 0;"></span>
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div style="max-width: 720px; margin-bottom: 36px;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #79867E;">Assets, capital planning, and verification</p>
        <h2 style="margin: 0 0 18px; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em; color: #EDF0EE;">Plan the work. Prove the result.</h2>
        <p style="margin: 0; font-size: 17px; line-height: 1.55; color: #A7B4AB;">Asset history and recurring failures become funded priorities. Measurement and verification checks whether each repair or project worked.</p>
      </div>

      <div class="r-cols-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;">
        <article v-for="item in highlights" :key="item.title" style="background: #17201B; border: 1px solid #26302A; border-radius: 16px; padding: 20px;">
          <h3 style="margin: 0 0 7px; font-size: 17px; font-weight: 600; letter-spacing: -0.01em; color: #EDF0EE;">{{ item.title }}</h3>
          <p style="margin: 0; font-size: 14.5px; line-height: 1.5; color: #A7B4AB;">{{ item.body }}</p>
        </article>
      </div>

      <div style="margin-top: 28px; display: flex; gap: 12px 22px; flex-wrap: wrap;">
        <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">Explore capital planning →</RouterLink>
        <RouterLink :to="ASSETS_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">Explore asset management →</RouterLink>
        <RouterLink :to="MV_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">Explore measurement and verification →</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-link:hover {
  text-decoration: underline;
}
</style>
