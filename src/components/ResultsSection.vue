<script setup lang="ts">
/**
 * Verified proof only. Re-confirm every figure immediately before each deploy;
 * add operational metrics (problems diagnosed, work orders completed, triage
 * time) here only once they are verified — never from conversational estimates.
 */
const metrics = [
  { value: '$400K', label: 'verified client savings' },
  { value: '34', label: 'school sites live' },
  { value: '24/7', label: 'monitoring across connected sites' },
]
</script>

<template>
  <!-- VERIFIED PROOF -->
  <section id="results" style="padding: 80px 32px 64px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div style="max-width: 720px; margin-bottom: 40px;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Verified proof</p>
        <h2 style="margin: 0; font-weight: 400; font-size: clamp(34px, 4.4vw, 50px); line-height: 1.05; letter-spacing: -0.03em;">Verified in real buildings.</h2>
      </div>
      <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
        <div v-for="m in metrics" :key="m.value" style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
          <div style="font-size: clamp(40px, 4.5vw, 58px); font-weight: 300; line-height: 1; letter-spacing: -0.04em;">{{ m.value }}</div>
          <div style="margin-top: 12px; font-size: 14.5px; color: #5F6B65; line-height: 1.45;">{{ m.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
