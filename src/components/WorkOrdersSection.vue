<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section id="work-orders" style="padding: 116px 32px; background: #FFFFFF; scroll-margin-top: 80px;">
    <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 0.92fr 1.08fr; gap: 64px; align-items: center;">
      <div>
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Work orders and maintenance</p>
        <h2 style="margin: 0; font-weight: 400; font-size: clamp(34px, 4.4vw, 52px); line-height: 1.05; letter-spacing: -0.03em;">From “the room is hot” to the right person and a verified fix.</h2>
        <p style="margin: 24px 0 0; font-size: 18px; line-height: 1.65; color: #4B5550;">Edviro gives districts a native work-order and asset system built for school facilities. Requests can be triaged, assigned by trade, tied to a building or asset, and delivered to technicians on mobile devices.</p>
        <p style="margin: 18px 0 0; font-size: 18px; line-height: 1.65; color: #4B5550;">Replace a work-order system that no longer fits—or keep the system your team already likes and connect it to Edviro. Either way, energy findings and equipment history reach the same operational workflow.</p>
        <RouterLink to="/solutions/school-facilities-operations/" class="work-link" style="display: inline-flex; margin-top: 28px; align-items: center; gap: 8px; color: #EDF0EE; background: var(--accent); padding: 13px 22px; border-radius: 999px; font-size: 15px; font-weight: 500; text-decoration: none;">See the school O&amp;M platform &rarr;</RouterLink>
      </div>
      <div style="background: #F3F5F3; border: 1px solid #D8DED9; border-radius: 20px; padding: 28px;">
        <div style="display: flex; justify-content: space-between; gap: 18px; align-items: start; padding-bottom: 20px; border-bottom: 1px solid #D8DED9;">
          <div>
            <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #75817B;">New request · Lincoln Middle School</div>
            <div style="font-size: 24px; font-weight: 500; letter-spacing: -0.02em; margin-top: 8px;">Room 214 is too warm</div>
          </div>
          <span style="white-space: nowrap; padding: 6px 10px; border-radius: 999px; background: #FDE8D8; color: #8A3C12; font-size: 12px; font-weight: 600;">Priority: high</span>
        </div>
        <div style="display: grid; gap: 14px; margin-top: 20px;">
          <div style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 12px; padding: 16px;">
            <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #75817B;">Triage</div>
            <p style="margin: 7px 0 0; color: #39443E; line-height: 1.55;">Likely schedule override. Zone ran 3.1 hours beyond occupancy yesterday; no active safety alarm.</p>
          </div>
          <div class="r-cols-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 12px; padding: 16px;">
              <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #75817B;">Assigned</div>
              <p style="margin: 7px 0 0; color: #39443E;">HVAC · North route</p>
            </div>
            <div style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 12px; padding: 16px;">
              <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #75817B;">Context</div>
              <p style="margin: 7px 0 0; color: #39443E;">AHU-4 · 2 related requests</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px; color: #2D6A4F; font-size: 14px; font-weight: 600;">
            <span style="width: 9px; height: 9px; border-radius: 50%; background: #43A56A;"></span>
            Technician notified; evidence attached
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.work-link:hover { filter: brightness(1.12); }
</style>
