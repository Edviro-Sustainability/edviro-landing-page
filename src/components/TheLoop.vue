<script setup lang="ts">
/**
 * The technical loop. Lives on /about/ (linked from the homepage workflow's
 * "Read the technical version"), so buyers meet the solution sections before
 * this; each stage is introduced with the buyer-facing phrase first and the
 * technical term second.
 */
const stages = [
  {
    n: '01',
    plain: 'Connect your systems',
    tech: 'Ingest',
    body: 'Bills, interval meters, BMS exports, spreadsheets, staff requests, and work-order systems are read into one operational record per building. Keep what works; nothing has to be replaced to start.',
  },
  {
    n: '02',
    plain: 'Spot the problem and find the likely cause',
    tech: 'Detect and diagnose',
    body: 'Edviro learns each building\'s normal load, schedules, and equipment behavior, flags drift and faults, then gathers the context—calendar, weather, asset history—to explain what is most likely happening.',
  },
  {
    n: '03',
    plain: 'Assign or make the fix',
    tech: 'Act',
    body: 'It raises and routes the work order, gives the technician the steps, or proposes a schedule or setpoint change. Changes are staged for review and approval before anything runs.',
  },
  {
    n: '04',
    plain: 'Confirm that it worked',
    tech: 'Verify',
    body: 'Every change is checked against the learned baseline in the meter and building data. If it did not hold, you know—and the record says why.',
  },
]
</script>

<template>
  <!-- THE TECHNICAL LOOP -->
  <section id="loop" style="padding: 40px 32px 90px; scroll-margin-top: 80px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div style="max-width: 820px;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Under the hood: the closed loop</p>
        <h2 style="margin: 0; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em;">Monitoring tools stop at the chart.<br />Edviro is the layer that acts on it.</h2>
        <p style="margin: 24px 0 0; max-width: 620px; font-size: 18px; line-height: 1.6; color: #4B5550;">Dashboards and alarm lists leave the fixing on your plate. Edviro runs one closed loop across energy, diagnostics, work orders, assets, and planning: it connects the data, finds the problem, coordinates the fix, then checks its own work in the building data.</p>
      </div>

      <div class="r-cols-4" style="margin-top: 56px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #D8DED9; border: 1px solid #D8DED9; border-radius: 18px; overflow: hidden;">
        <div v-for="s in stages" :key="s.n" style="background: #F9FAF9; padding: 30px 26px;">
          <div style="font-weight: 600; font-size: 12px; color: var(--accent); margin-bottom: 18px;">{{ s.n }} / {{ s.tech }}</div>
          <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: -0.01em;">{{ s.plain }}</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #5F6B65;">{{ s.body }}</p>
        </div>
      </div>

      <div class="r-split" style="margin-top: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start;">
        <div style="padding: 22px 24px; border-radius: 16px; background: #F5F7F5; border: 1px solid #E3E8E4;">
          <h3 style="margin: 0 0 8px; font-size: 17px; font-weight: 600;">A living operational model of each building</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #5F6B65;">Every reading, work order, inspection, and verified fix accumulates into one model per building—what engineers call a digital twin. It is what lets Edviro test a repair-or-replace decision or a new schedule against the building's real behavior before anyone commits money.</p>
        </div>
        <div style="padding: 22px 24px; border-radius: 16px; background: #F5F7F5; border: 1px solid #E3E8E4;">
          <h3 style="margin: 0 0 8px; font-size: 17px; font-weight: 600;">Edviro monitors and follows up automatically</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #5F6B65;">Behind the scenes, AI agents do the watching, investigating, and chasing—reading the data around the clock, drafting the work order, checking whether the fix held. People stay in charge: side effects are reviewed and approved by your team, and Edviro does not replace your staff, engineers, contractors, or building controls.</p>
        </div>
      </div>
    </div>
  </section>
</template>
