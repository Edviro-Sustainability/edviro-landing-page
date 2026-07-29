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
  { name: 'Capital Planning', path: '/capital-planning' },
]

const faqs: FaqItem[] = [
  {
    question: 'What is a digital twin of a building?',
    answer:
      'A digital twin is a living model of how your building actually behaves, built from the data Edviro already collects: bills, meters, BMS points, weather, tariffs, occupancy, and every work order and fix. It is not a 3D drawing. It is a model accurate enough to answer "what happens if we change this?" before you change it.',
  },
  {
    question: 'What kinds of interventions can Edviro simulate?',
    answer:
      'Equipment replacements versus repairs (replace Boiler #2 or keep tuning it), retrofits like controls upgrades or LED conversions, schedule and setpoint changes, rate and tariff changes, and additions like a new wing or electrified fleet. Each simulation returns projected savings, cost avoided, and payback against your real usage, not industry averages.',
  },
  {
    question: 'How do I know the projections are trustworthy?',
    answer:
      'Every projection uses the same learned baseline Edviro uses for measurement and verification, calibrated continuously against your actual meter data. And after you act on a recommendation, Edviro verifies the outcome against that baseline, so projections are checked against reality, and the model gets more accurate with every project.',
  },
  {
    question: 'How does this help with budget and bond planning?',
    answer:
      'Instead of ranking capital projects by age of equipment or gut feel, you rank them by modeled payback from your own data. When budget or bond season comes, you bring the board a prioritized list with projected savings, costs, and evidence, and later, verified results on what you already funded.',
  },
]

usePageSeo({
  title: 'Capital Planning & Intervention Simulation',
  description:
    'Edviro builds a digital twin of each building from your bills, meters, BMS, and work orders, then simulates interventions — replacements, retrofits, schedule changes — so you can rank capital projects by real payback before spending a dollar.',
  path: '/capital-planning',
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro capital planning and intervention simulation',
      description:
        'Digital-twin-based simulation of building interventions and capital projects, ranked by projected payback and verified after the fact.',
      path: '/capital-planning',
      serviceType: 'Capital planning',
    }),
    faqLd(faqs),
  ],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <!-- HERO -->
    <section style="padding: 40px 32px 56px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div style="max-width: 820px;">
          <p style="margin: 0 0 22px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">Capital planning</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 62px); line-height: 1.05; letter-spacing: -0.035em;">Test the project before you spend the budget.</h1>
          <p style="margin: 26px 0 0; max-width: 640px; font-size: 19px; line-height: 1.6; color: #55564C;">Every bill, meter reading, BMS point, and work order Edviro touches builds a digital twin of your building. Use it to simulate replacements, retrofits, and schedule changes, and rank capital projects by real payback before committing a dollar.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <a :href="BOOK_DEMO_PATH" target="_blank" rel="noopener" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #F4F2EC; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</a>
          </div>
        </div>
      </div>
    </section>

    <!-- DEFINITION -->
    <section style="padding: 20px 32px 60px;">
      <div style="max-width: 820px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 16px; font-weight: 400; font-size: clamp(26px, 3.4vw, 38px); line-height: 1.1; letter-spacing: -0.025em;">Capital decisions, made with evidence.</h2>
        <p style="margin: 0 0 16px; font-size: 17px; line-height: 1.7; color: #55564C;">Most capital plans are built on equipment age, vendor quotes, and gut feel. The data that could answer the real questions — replace or repair? which retrofit pays back first? what does the new wing do to demand charges? — is scattered across bills, spreadsheets, BMS exports, and work-order systems where no one can use it.</p>
        <p style="margin: 0; font-size: 17px; line-height: 1.7; color: #55564C;">Edviro already pulls that data into one place to run your buildings day to day. Capital planning is what it compounds into: a digital twin of each building, accurate enough to simulate an intervention and project its payback before you bring it to the board.</p>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section style="padding: 50px 32px; background: #16170F; color: #F4F2EC;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8E907F;">How it works</p>
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.8vw, 44px); line-height: 1.06; letter-spacing: -0.03em; color: #F8F7F1; max-width: 640px;">A twin that learns, simulations you can defend.</h2>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #2D2E22; border: 1px solid #2D2E22; border-radius: 16px; overflow: hidden;">
          <div style="background: #1F2017; padding: 28px;">
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #6FCF97; margin-bottom: 14px;">01 / Twin</div>
            <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: #F4F2EC;">Build the model</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #C9CABA;">Every data source Edviro connects and every fix it verifies feeds a living digital twin of each building. No extra setup, it comes from running your operations.</p>
          </div>
          <div style="background: #1F2017; padding: 28px;">
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #6FCF97; margin-bottom: 14px;">02 / Simulate</div>
            <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: #F4F2EC;">Test the intervention</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #C9CABA;">Run replacements, retrofits, schedule changes, and rate scenarios against the twin. See projected savings and payback from your real usage, not industry averages.</p>
          </div>
          <div style="background: #1F2017; padding: 28px;">
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #6FCF97; margin-bottom: 14px;">03 / Decide</div>
            <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: #F4F2EC;">Rank and prove</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #C9CABA;">Bring the board a prioritized capital plan with modeled payback for each option, then verified results after the work is done.</p>
          </div>
        </div>
        <div style="margin-top: 28px; display: inline-flex; align-items: baseline; gap: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #8E907F;">
          <span style="color: #6FCF97; font-size: 15px;">Replace vs. repair</span> answered from your own meter data, before the purchase order
        </div>
      </div>
    </section>

    <!-- WHO USES IT -->
    <section style="padding: 56px 32px 20px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 28px; font-weight: 400; font-size: clamp(26px, 3.4vw, 38px); line-height: 1.1; letter-spacing: -0.025em;">Where simulation matters most</h2>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <RouterLink to="/solutions/schools" class="card-link" style="text-decoration: none; color: inherit; border: 1px solid #E3E0D5; border-radius: 16px; padding: 24px; background: #FBFAF6; display: block;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 6px;">Schools &rarr;</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">Walk into budget and bond season with a ranked project list and the data behind it.</p>
          </RouterLink>
          <RouterLink to="/solutions/real-estate" class="card-link" style="text-decoration: none; color: inherit; border: 1px solid #E3E0D5; border-radius: 16px; padding: 24px; background: #FBFAF6; display: block;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 6px;">Real estate &rarr;</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">Prioritize capex across the portfolio by modeled payback, building by building.</p>
          </RouterLink>
          <RouterLink to="/solutions/construction" class="card-link" style="text-decoration: none; color: inherit; border: 1px solid #E3E0D5; border-radius: 16px; padding: 24px; background: #FBFAF6; display: block;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 6px;">Construction &rarr;</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">Compare the as-built twin to the design model and catch variance before handover.</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Capital planning questions" heading="Frequently asked" :items="faqs" />

    <CtaSection />
  </main>
</template>

<style scoped>
.book-btn:hover {
  filter: brightness(1.12);
}
.card-link:hover {
  border-color: #1a1b14 !important;
}
</style>
