<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import { BOOK_DEMO_PATH } from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions/real-estate/' },
  { name: 'Real estate & offices', path: '/solutions/real-estate/' },
]

const faqs: FaqItem[] = [
  {
    question: 'How does occupancy-based control work without new sensors?',
    answer:
      'Edviro reads occupancy from the WiFi routers already on every floor, then ties HVAC and lighting to who is actually in the building. You only condition space that is in use, with no new sensors to install.',
  },
  {
    question: 'Will autonomous setbacks affect tenant comfort?',
    answer:
      'No. Edviro runs occupancy-aware setbacks and demand management that cut energy and peak charges while keeping occupied spaces comfortable. Space is restored automatically on the first morning badge-in or arrival.',
  },
  {
    question: 'What systems does Edviro connect to in a commercial building?',
    answer:
      'Edviro connects your whole building stack, including the building management system, main meters, submeters, and the WiFi routers already on every floor, into one live model that detects waste and acts on it.',
  },
  {
    question: 'How does Edviro reduce peak demand charges?',
    answer:
      'Edviro forecasts demand spikes and pre-cools or shifts load off the tariff peak before charges land, then verifies the avoided demand charge in the meter data so the savings are provable.',
  },
  {
    question: 'How does Edviro help prioritize capital projects across a portfolio?',
    answer:
      'Everything Edviro learns about each building builds a digital twin. Candidate projects, retrofits, equipment replacements, controls upgrades, are simulated against the twin and ranked by modeled payback from your real usage, so capex goes to the projects that pay back first.',
  },
]

usePageSeo({
  title: 'Energy management for commercial real estate',
  description:
    'Edviro turns the WiFi, BMS, and meters you already have into occupancy-aware HVAC and lighting control, cutting energy and peak demand charges while keeping tenants comfortable.',
  path: '/solutions/real-estate/',
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro energy management for commercial real estate',
      description:
        'Occupancy-aware HVAC and lighting control for offices and commercial buildings, using existing WiFi, BMS, and meters.',
      path: '/solutions/real-estate/',
      areaServed: 'United States',
    }),
    faqLd(faqs),
  ],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <!-- HERO -->
    <section style="padding: 40px 32px 64px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div style="max-width: 760px;">
          <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">For real estate &amp; offices</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 62px); line-height: 1.05; letter-spacing: -0.035em;">Comfort tenants notice, <span style="color: var(--accent);">opex they don't</span>.</h1>
          <p style="margin: 26px 0 0; max-width: 600px; font-size: 19px; line-height: 1.6; color: #4B5550;">Edviro turns the WiFi, BMS, and meters you already have into occupancy-aware HVAC and lighting control, cutting energy and peak demand charges while keeping tenants comfortable.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</RouterLink>
            <RouterLink to="/measurement-and-verification/" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #171D1A; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #C0CCC3;">See how we prove savings</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- PILLARS -->
    <section style="padding: 30px 32px 60px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 620px;">Built for the buildings people work in.</h2>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Connects your whole stack</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">BMS, meters, submeters, and the WiFi routers already on every floor, pulled into one live model.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Occupancy-aware control</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">Edviro reads occupancy from existing WiFi, then conditions only the space that is actually in use.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Demand management</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">Autonomous setbacks and load shifting cut energy and peak charges, verified on the bill.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EXAMPLE -->
    <section style="padding: 50px 32px; background: #101815; color: #EDF0EE;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #79867E;">In practice</p>
          <h2 style="margin: 0 0 18px; font-weight: 400; font-size: clamp(26px, 3.4vw, 40px); line-height: 1.08; letter-spacing: -0.03em; color: #F2F5F1;">An empty wing shouldn't cost a full floor.</h2>
          <p style="margin: 0; font-size: 17px; line-height: 1.65; color: #C4CBC5;">When a wing empties after 6:00pm but stays fully conditioned, Edviro confirms the floor is empty from WiFi, sets HVAC and lighting back, and restores it on the first morning badge-in, all without a facilities call.</p>
        </div>
        <div style="background: #17201B; border: 1px solid #26302A; border-radius: 18px; padding: 24px;">
          <div style="font-weight: 600; font-size: 11px; color: #79867E; margin-bottom: 8px;">ZONE · Floor 4 East · occupancy</div>
          <div style="font-size: 17px; font-weight: 600; color: #EDF0EE; line-height: 1.35; margin-bottom: 16px;">Wing empty after 6:00pm but still fully conditioned. Setting back to unoccupied mode.</div>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 14px; color: #C4CBC5;">
            <div>Occupancy confirmed from WiFi routers</div>
            <div>HVAC and lighting set back</div>
            <div style="color: #79867E;">Restore on first morning badge-in</div>
          </div>
          <div style="margin-top: 16px; display: flex; align-items: center; justify-content: space-between; font-weight: 500; font-size: 11px; color: #79867E;">
            <span>Verifying in meter data…</span>
            <span style="color: #6FCF97;">est. −$3,400/yr</span>
          </div>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from operators" heading="Real estate FAQ" :items="faqs" />

    <CtaSection />
  </main>
</template>

<style scoped>
.book-btn:hover {
  filter: brightness(1.12);
}
.outline-btn:hover {
  border-color: #171D1A !important;
}
</style>
