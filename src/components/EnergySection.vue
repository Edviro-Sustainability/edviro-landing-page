<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { CMMS_PATH, SCHOOL_ENERGY_PATH } from '@/seo/site'

const examples = [
  'Unexpected gas or water use',
  'After-hours HVAC',
  'Demand spikes',
  'Solar underperformance',
  'Heating and cooling together',
  'Equipment short cycling',
  'Schedule mismatch',
  'School-to-school outliers',
]

const sources = [
  'Modern BMS',
  'Legacy controls',
  'Utility data and bills',
  'Spreadsheets and exports',
  'Schedules',
  'Existing CMMS',
]
</script>

<template>
  <!-- ENERGY, DIAGNOSTICS, AND EXISTING SYSTEMS -->
  <section id="energy" style="position: relative; padding: 80px 32px; background: #F5F7F5; border-top: 1px solid #E3E8E4; border-bottom: 1px solid #E3E8E4;">
    <!-- Preserve the former deep link after folding SystemsSection into this section. -->
    <span id="systems" aria-hidden="true" style="position: absolute; top: 0; left: 0;"></span>
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div class="r-split" style="display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; align-items: start;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Energy, diagnostics, and integrations</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em;">See what changed. Use what you have.</h2>
          <p style="margin: 0 0 18px; font-size: 17px; line-height: 1.55; color: #4B5550;">Connect utility data, building systems, schedules, bills, spreadsheets, and work orders. Edviro finds likely causes and turns them into action.</p>
          <p style="margin: 0 0 22px; font-size: 18px; font-weight: 600; color: #171D1A;">Keep what works. Consolidate what doesn't.</p>

          <p style="margin: 0 0 10px; font-weight: 600; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #75817B;">Connect what exists</p>
          <ul style="list-style: none; margin: 0 0 26px; padding: 0; display: flex; flex-wrap: wrap; gap: 8px;">
            <li v-for="source in sources" :key="source" style="font-size: 13.5px; font-weight: 500; color: #33403A; background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 999px; padding: 7px 11px;">{{ source }}</li>
          </ul>

          <div style="display: flex; flex-wrap: wrap; gap: 10px 20px;">
            <RouterLink :to="SCHOOL_ENERGY_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: var(--accent); text-decoration: none;">Explore energy management software for schools →</RouterLink>
            <RouterLink :to="CMMS_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: var(--accent); text-decoration: none;">Replace or integrate your CMMS →</RouterLink>
          </div>
        </div>

        <div>
          <p style="margin: 0 0 14px; font-weight: 600; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #75817B;">What Edviro catches</p>
          <ul class="r-cols-2" style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <li v-for="example in examples" :key="example" style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 14px; padding: 16px 18px; font-size: 15px; font-weight: 600;">{{ example }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-link:hover {
  text-decoration: underline;
}
</style>
