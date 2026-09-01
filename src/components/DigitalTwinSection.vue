<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- DIGITAL TWIN / CAPITAL PLANNING -->
  <section id="twin" style="padding: 116px 32px; background: #101815; color: #EDF0EE; scroll-margin-top: 80px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div style="max-width: 720px;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #79867E;">Digital twin</p>
        <h2 style="margin: 0; font-weight: 400; font-size: clamp(34px, 4.6vw, 54px); line-height: 1.05; letter-spacing: -0.03em; color: #F2F5F1;">Every fix makes the model smarter.<br />The model makes your next dollar smarter.</h2>
        <p style="margin: 24px 0 0; max-width: 600px; font-size: 18px; line-height: 1.6; color: #C4CBC5;">Everything Edviro ingests and every action it verifies builds a living digital twin of each building. That twin is how capital decisions stop being guesswork: simulate the intervention, see the payback, then fund the project.</p>
      </div>

      <div class="r-cols-3" style="margin-top: 56px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #26302A; border: 1px solid #26302A; border-radius: 18px; overflow: hidden;">
        <div style="background: #17201B; padding: 30px 26px;">
          <div style="font-weight: 600; font-size: 12px; color: #6FCF97; margin-bottom: 18px;">Simulate interventions</div>
          <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: -0.01em; color: #EDF0EE;">Replace or repair?</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C4CBC5;">Test "replace Boiler #2" against "keep tuning it" in the twin, and see projected savings and payback from your real usage before the purchase order.</p>
        </div>
        <div style="background: #17201B; padding: 30px 26px;">
          <div style="font-weight: 600; font-size: 12px; color: #6FCF97; margin-bottom: 18px;">Model what's coming</div>
          <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: -0.01em; color: #EDF0EE;">What does the new wing cost?</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C4CBC5;">Run additions, retrofits, schedule changes, and rate scenarios against the twin, so surprises show up in the model instead of on the bill.</p>
        </div>
        <div style="background: #17201B; padding: 30px 26px;">
          <div style="font-weight: 600; font-size: 12px; color: #6FCF97; margin-bottom: 18px;">Plan capital</div>
          <h3 style="margin: 0 0 10px; font-size: 20px; font-weight: 600; letter-spacing: -0.01em; color: #EDF0EE;">Rank projects by payback</h3>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C4CBC5;">Walk into budget season with projects ranked by modeled payback from your own data, then show verified results on what you already funded.</p>
        </div>
      </div>

      <div style="margin-top: 36px;">
        <RouterLink to="/capital-planning/" class="twin-link" style="display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; border: 1px solid #39443E; padding: 13px 24px; border-radius: 999px;">How capital planning works &rarr;</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.twin-link:hover {
  border-color: #edf0ee;
}
</style>
