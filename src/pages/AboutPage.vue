<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TeamSection from '@/components/TeamSection.vue'
import TheLoop from '@/components/TheLoop.vue'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, organizationLd } from '@/seo/jsonld'
import {
  ABOUT_PATH,
  BRAND_PROMISE,
  CONTACT_EMAIL,
  FACILITIES_OPS_PATH,
  SCHOOL_ENERGY_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: ABOUT_PATH },
]

usePageSeo({
  title: 'About Edviro',
  description:
    'Edviro is a Y Combinator-backed team building an AI-powered facilities operations platform for schools—an AI-native operations and maintenance system that connects energy, diagnostics, work orders, assets, and capital planning.',
  path: ABOUT_PATH,
  type: 'website',
  jsonLd: [organizationLd(), breadcrumbLd(breadcrumbs)],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <!-- HERO -->
    <section style="padding: 40px 32px 56px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div style="max-width: 820px;">
          <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">About Edviro</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 62px); line-height: 1.05; letter-spacing: -0.035em;">Bringing AI to the people who <span style="color: var(--accent);">run the buildings</span>.</h1>
          <p style="margin: 26px 0 0; max-width: 680px; font-size: 19px; line-height: 1.6; color: #4B5550;">School facilities teams are handed alarm lists, dashboards, and spreadsheets instead of answers—and the fixing stays on their plate. Edviro exists to close that gap. It connects building signals, work orders, assets, schedules, field teams, projects, and budgets so a district can find the problem, coordinate the fix, and verify the result.</p>
          <p style="margin: 18px 0 0; max-width: 680px; font-size: 17px; line-height: 1.6; color: #4B5550;">Energy is where we started, and where many districts still start with us: the meter data reveals operational problems fast. From there Edviro extends through resolution, maintenance, and planning—as the district's work-order and asset system, or connected to the one it already has.</p>
        </div>
      </div>
    </section>

    <!-- MISSION / APPROACH -->
    <section style="padding: 20px 32px 40px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h2 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Hands-on from the start</h2>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">Edviro began working directly with school facilities teams, learning what they actually need to run buildings well—and what a director of maintenance does with a finding once the chart has shown it.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h2 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Applied AI, in the real world</h2>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">The team has shipped applied AI across climate, healthcare, and aviation, and brings that rigor to building operations: AI that monitors and follows up, with people reviewing and approving every change.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h2 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Backed by Y Combinator</h2>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">Edviro is a Y Combinator-backed company building an AI-native operations and maintenance platform for school facilities.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT WE BELIEVE -->
    <section style="padding: 30px 32px 50px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div style="border: 1px solid #D8DED9; border-radius: 18px; background: #F5F7F5; padding: 32px;">
          <p style="margin: 0 0 12px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">What we're building toward</p>
          <p style="margin: 0 0 14px; font-size: clamp(22px, 2.6vw, 30px); font-weight: 400; line-height: 1.2; letter-spacing: -0.02em;">{{ BRAND_PROMISE }}</p>
          <p style="margin: 0; max-width: 760px; font-size: 16px; line-height: 1.6; color: #4B5550;">Monitor energy. Diagnose issues. Manage work. Plan capital. One record from the first signal to the verified fix, across <RouterLink :to="SCHOOL_ENERGY_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">energy management</RouterLink> and the rest of <RouterLink :to="FACILITIES_OPS_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">school facilities operations</RouterLink>.</p>
        </div>
      </div>
    </section>

    <TheLoop />

    <TeamSection />

    <!-- CONTACT -->
    <section style="padding: 10px 32px 90px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div style="border: 1px solid #D8DED9; border-radius: 18px; background: #F9FAF9; padding: 32px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
          <div>
            <h2 style="margin: 0 0 6px; font-size: 20px; font-weight: 600;">Get in touch</h2>
            <p style="margin: 0; font-size: 15.5px; color: #5F6B65;">Questions, partnerships, or press? We'd love to hear from you.</p>
          </div>
          <a :href="`mailto:${CONTACT_EMAIL}`" class="contact-email" style="font-weight: 500; font-size: 14px; color: var(--accent); text-decoration: none; border: 1px solid #C0CCC3; padding: 12px 20px; border-radius: 999px;">{{ CONTACT_EMAIL }}</a>
        </div>
      </div>
    </section>

    <CtaSection />
  </main>
</template>

<style scoped>
.contact-email:hover {
  border-color: #171D1A !important;
}
.text-link:hover {
  text-decoration: underline;
}
</style>
