<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { CMMS_PATH, WORK_ORDERS_PATH } from '@/seo/site'

const capabilities = [
  { title: 'Intake and triage', body: 'Capture, categorize, and prioritize requests.' },
  { title: 'Assign and equip', body: 'Route work with asset history and instructions.' },
  { title: 'Update in the field', body: 'Add notes, photos, inspections, and status.' },
  { title: 'Close the loop', body: 'Check building data after completion.' },
]
</script>

<template>
  <!-- WORK ORDERS AND MAINTENANCE -->
  <section id="work-orders" style="padding: 80px 32px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div class="r-split" style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 64px; align-items: start;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Work orders and maintenance</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em;">A complete work-order system—not just another alert.</h2>
          <p style="margin: 0 0 28px; font-size: 17px; line-height: 1.55; color: #4B5550;">From request to verified repair, with the right context at every step.</p>

          <ul class="r-cols-2" style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 18px 24px;">
            <li v-for="cap in capabilities" :key="cap.title" style="display: flex; gap: 12px;">
              <span aria-hidden="true" style="flex: none; margin-top: 6px; width: 8px; height: 8px; border-radius: 999px; background: var(--accent);"></span>
              <div>
                <div style="font-size: 15.5px; font-weight: 600; margin-bottom: 3px;">{{ cap.title }}</div>
                <div style="font-size: 14.5px; line-height: 1.5; color: #5F6B65;">{{ cap.body }}</div>
              </div>
            </li>
          </ul>

          <div style="margin-top: 28px; padding-top: 22px; border-top: 1px solid #D8DED9;">
            <p style="margin: 0 0 10px; font-size: 17px; font-weight: 600; color: #171D1A;">Replace your current work-order system or connect Edviro to it.</p>
            <div style="display: flex; gap: 18px; flex-wrap: wrap;">
              <RouterLink :to="WORK_ORDERS_PATH" class="text-link" style="font-size: 14.5px; font-weight: 500; color: var(--accent); text-decoration: none;">See the school work-order software →</RouterLink>
              <RouterLink :to="CMMS_PATH" class="text-link" style="font-size: 14.5px; font-weight: 500; color: var(--accent); text-decoration: none;">Replace or integrate your CMMS →</RouterLink>
            </div>
          </div>
        </div>

        <!-- Native Edviro work-order workflow (illustrative) -->
        <figure style="margin: 0; background: #101815; border-radius: 22px; padding: 30px; box-shadow: 0 40px 80px -40px rgba(0,0,0,0.45);">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 20px;">
            <span style="font-weight: 600; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #79867E;">Edviro · Mobile work order</span>
            <span style="font-weight: 600; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #101815; background: #6FCF97; padding: 3px 9px; border-radius: 999px; white-space: nowrap;">Native Edviro workflow</span>
          </div>
          <div style="background: #17201B; border: 1px solid #26302A; border-radius: 14px; padding: 18px;">
            <div style="display: flex; justify-content: space-between; gap: 10px; font-weight: 600; font-size: 11px; color: #79867E; margin-bottom: 8px;">
              <span>WORK ORDER #4821 · Boiler plant</span>
              <span style="color: #E0B15C;">HIGH</span>
            </div>
            <div style="font-size: 17px; font-weight: 600; color: #EDF0EE; line-height: 1.35; margin-bottom: 12px;">Boiler #2 short-cycling. Check pump and firing differential.</div>
            <div style="font-size: 12.5px; color: #A7B4AB; margin-bottom: 16px; line-height: 1.5;">Last service: Mar 14 · 2 similar faults · Assigned to zone technician</div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C4CBC5;"><span aria-hidden="true" style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Isolate and inspect circulation pump</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #C4CBC5;"><span aria-hidden="true" style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #6FCF97; display: inline-flex; align-items: center; justify-content: center; color: #6FCF97; font-size: 11px;">✓</span> Reset firing differential</div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 14px; color: #79867E;"><span aria-hidden="true" style="width: 18px; height: 18px; border-radius: 999px; border: 1.5px solid #39443E;"></span> Verify starts per hour</div>
            </div>
          </div>
          <div style="margin-top: 16px; display: flex; align-items: center; justify-content: space-between; font-weight: 500; font-size: 11px; color: #79867E;">
            <span>Verifying in meter data…</span>
            <span style="color: #6FCF97;">closes when starts/hr holds normal</span>
          </div>
          <figcaption style="margin-top: 14px; font-size: 12px; color: #79867E; line-height: 1.5;">Illustrative view of Edviro's native work-order workflow on a technician's phone.</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-link:hover {
  text-decoration: underline;
}
</style>
