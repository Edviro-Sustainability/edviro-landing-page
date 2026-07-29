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
  { name: 'Solutions', path: '/solutions/schools' },
  { name: 'Schools', path: '/solutions/schools' },
]

const faqs: FaqItem[] = [
  {
    question: 'How does Edviro help school facilities teams save energy?',
    answer:
      'Edviro connects to your existing meters, building management system, and utility bills, learns how each school normally uses energy, and continuously watches for waste. When it finds a problem, like a boiler short-cycling or HVAC running in an empty wing, it raises a step-by-step work order or makes the fix automatically, then confirms the savings in the meter data.',
  },
  {
    question: 'Do we need to install new hardware or replace our BMS?',
    answer:
      'No. Edviro is software that sits on top of what you already have. It connects to your meters, building management system, sensors, and utility data without ripping anything out, so districts can roll it out across many sites quickly.',
  },
  {
    question: 'Is this a replacement for a periodic energy audit?',
    answer:
      'Edviro effectively performs a continuous energy audit. Instead of waiting for a quarterly or annual audit, it catches drift, faults, and waste the moment they start and verifies every correction against a learned baseline.',
  },
  {
    question: 'Can Edviro help with capital planning and bond season?',
    answer:
      'Yes. Everything Edviro learns about your schools builds a digital twin of each building. You can simulate capital projects against it, replace a boiler versus keep tuning it, or model what a new wing does to demand charges, and walk into budget or bond season with projects ranked by modeled payback from your own data.',
  },
  {
    question: 'How quickly can a district see results?',
    answer:
      'Edviro typically connects a few sites and shows what it catches within the first week, with no upfront audit and no rip-and-replace. To date Edviro has saved clients over $400K, with 7 school sites live and 29 more expanding.',
  },
]

usePageSeo({
  title: 'Energy management for schools',
  description:
    'Edviro gives K-12 facilities teams a continuous energy audit, automatic fault detection, and ready-to-act work orders across every site, with no new hardware and no rip-and-replace.',
  path: '/solutions/schools',
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro energy management for schools',
      description:
        'Autonomous energy management for K-12 school facilities: continuous auditing, fault detection, and verified savings.',
      path: '/solutions/schools',
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
          <p style="margin: 0 0 22px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">For school facilities</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 62px); line-height: 1.05; letter-spacing: -0.035em;">Energy management for schools that <span style="color: var(--accent);">runs itself</span>.</h1>
          <p style="margin: 26px 0 0; max-width: 600px; font-size: 19px; line-height: 1.6; color: #55564C;">Edviro gives K-12 facilities teams a continuous energy audit, automatic fault detection, and ready-to-act work orders across every site. No new hardware, no rip-and-replace.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #F4F2EC; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</RouterLink>
            <RouterLink to="/measurement-and-verification" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #1A1B14; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #CFCBBD;">See how we prove savings</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY SCHOOLS -->
    <section style="padding: 30px 32px 60px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 620px;">Built for the people who run the building.</h2>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <div style="border-top: 1.5px solid #1A1B14; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Plugs into what you already have</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">Your meters, your BMS, your utility bills. Edviro connects them all into one live model of every school.</p>
          </div>
          <div style="border-top: 1.5px solid #1A1B14; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Does the audit for you</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">A continuous energy consultation for every site. The moment something drifts, Edviro catches it, not at next quarter's audit.</p>
          </div>
          <div style="border-top: 1.5px solid #1A1B14; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Hands you the fix, or just does it</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">A step-by-step work order in your pocket, or an autonomous setpoint change overnight, tested before it ships.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT IT CATCHES -->
    <section style="padding: 50px 32px; background: #16170F; color: #F4F2EC;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8E907F;">What Edviro catches</p>
        <h2 style="margin: 0 0 36px; font-weight: 400; font-size: clamp(28px, 3.8vw, 44px); line-height: 1.06; letter-spacing: -0.03em; color: #F8F7F1; max-width: 640px;">Waste hides in every school. Edviro finds it in the data.</h2>
        <div class="r-cols-2" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: #2D2E22; border: 1px solid #2D2E22; border-radius: 16px; overflow: hidden;">
          <div style="background: #1F2017; padding: 26px;">
            <div style="font-size: 17px; font-weight: 600; color: #F4F2EC; margin-bottom: 8px;">Boiler short-cycling</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C9CABA;">Detects a boiler starting 14 times an hour and dispatches a guided work order to reset the firing differential.</p>
          </div>
          <div style="background: #1F2017; padding: 26px;">
            <div style="font-size: 17px; font-weight: 600; color: #F4F2EC; margin-bottom: 8px;">Off-hours runtime</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C9CABA;">Flags HVAC and lighting running all weekend in empty buildings and restores the right night setback.</p>
          </div>
          <div style="background: #1F2017; padding: 26px;">
            <div style="font-size: 17px; font-weight: 600; color: #F4F2EC; margin-bottom: 8px;">Ventilation and comfort</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C9CABA;">Spots CO2 rising in a gym or classroom and corrects the ventilation schedule without overrunning energy.</p>
          </div>
          <div style="background: #1F2017; padding: 26px;">
            <div style="font-size: 17px; font-weight: 600; color: #F4F2EC; margin-bottom: 8px;">Demand spikes</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C9CABA;">Pre-cools and shifts load before a demand charge lands, avoiding thousands in peak billing.</p>
          </div>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from districts" heading="Schools FAQ" :items="faqs" />

    <CtaSection />
  </main>
</template>

<style scoped>
.book-btn:hover {
  filter: brightness(1.12);
}
.outline-btn:hover {
  border-color: #1a1b14 !important;
}
</style>
