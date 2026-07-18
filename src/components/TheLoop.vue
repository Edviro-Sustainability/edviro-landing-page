<script setup lang="ts"></script>

<template>
  <!-- THE LOOP -->
  <section id="loop" style="padding: 116px 32px; scroll-margin-top: 80px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div style="max-width: 720px;">
        <p style="margin: 0 0 18px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">The closed loop</p>
        <h2 style="margin: 0; font-weight: 400; font-size: clamp(34px, 4.6vw, 54px); line-height: 1.05; letter-spacing: -0.03em;">Monitoring shows you the waste.<br />Edviro is the layer that acts on it.</h2>
        <p style="margin: 24px 0 0; max-width: 560px; font-size: 18px; line-height: 1.6; color: #55564C;">Utility tracking and monitoring tools stop at charts, and the fixing stays on your plate. Edviro closes the loop: it raises the work order, makes the change, then checks its own work in the meter data.</p>
      </div>

      <div class="r-cols-4" style="margin-top: 56px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: #E3E0D5; border: 1px solid #E3E0D5; border-radius: 18px; overflow: hidden;">
        <div style="background: #FBFAF6; padding: 30px 26px;">
          <div style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--accent); margin-bottom: 18px;">01 / Ingest</div>
          <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: -0.01em;">Connect what you have</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">Data scattered across bills, meters, BMS exports, spreadsheets, and work-order systems, all pulled into one place. Nothing to rip out.</p>
        </div>
        <div style="background: #FBFAF6; padding: 30px 26px;">
          <div style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--accent); margin-bottom: 18px;">02 / Detect</div>
          <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: -0.01em;">Learn the building</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">It learns each building's normal load, schedules, and equipment, then flags drift, anomalies, and waste in real time.</p>
        </div>
        <div style="background: #FBFAF6; padding: 30px 26px;">
          <div style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--accent); margin-bottom: 18px;">03 / Act</div>
          <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: -0.01em;">Take the fix</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">The execution layer: it raises work orders, guides your team in the app, and adjusts setpoints and schedules, after testing each change first.</p>
        </div>
        <div style="background: #FBFAF6; padding: 30px 26px;">
          <div style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--accent); margin-bottom: 18px;">04 / Verify</div>
          <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: -0.01em;">Prove the savings</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">Every change is confirmed in the meter data and on your bill. If it didn't save, you'll know.</p>
        </div>
      </div>
    </div>
  </section>
</template>
