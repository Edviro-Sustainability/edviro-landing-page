<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LiveDemo from './LiveDemo.vue'
import { ABOUT_PATH } from '@/seo/site'

defineProps<{ demoSpeed?: number }>()

/** Buyer-facing path from signal to verified resolution. The technical loop (Ingest → Detect → Act → Verify) is the small caption under the visual and the #loop section on /about/. */
const steps = [
  { title: 'Spot it', body: 'Requests, meters, alarms, and schedules surface the issue.' },
  { title: 'Diagnose it', body: 'Edviro gathers context and finds the likely cause.' },
  { title: 'Route it', body: 'Assign the work in Edviro or your existing CMMS.' },
  { title: 'Verify it', body: 'Building data confirms whether the fix held.' },
]
</script>

<template>
  <!-- FROM SIGNAL TO VERIFIED RESOLUTION -->
  <section id="how-it-works" style="padding: 40px 32px 80px; background: #F5F7F5; border-top: 1px solid #E3E8E4; border-bottom: 1px solid #E3E8E4;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div style="max-width: 760px; margin: 0 auto; text-align: center;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">How Edviro works</p>
        <h2 style="margin: 0; font-weight: 400; font-size: clamp(30px, 3.6vw, 44px); line-height: 1.07; letter-spacing: -0.03em;">From signal to verified fix.</h2>
        <p style="margin: 16px auto 0; max-width: 560px; font-size: 17px; line-height: 1.55; color: #4B5550;">Find the issue. Route the work. Check the result.</p>
      </div>

      <LiveDemo :demo-speed="demoSpeed" />

      <ol class="r-cols-4" style="list-style: none; margin: 40px 0 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; counter-reset: step;">
        <li
          v-for="(step, i) in steps"
          :key="step.title"
          style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 16px; padding: 20px;"
        >
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
            <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">{{ i + 1 }}</span>
            <h3 style="margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.01em;">{{ step.title }}</h3>
          </div>
          <p style="margin: 0; font-size: 15px; line-height: 1.55; color: #5F6B65;">{{ step.body }}</p>
        </li>
      </ol>

      <p style="margin: 28px 0 0; text-align: center; font-size: 14px; color: #6B7570;">
        Ingest. Detect. Act. Verify.
        <RouterLink :to="{ path: ABOUT_PATH, hash: '#loop' }" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">Read the technical version →</RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.text-link:hover {
  text-decoration: underline;
}
</style>
