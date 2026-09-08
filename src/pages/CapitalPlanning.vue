<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import {
  ASSETS_PATH,
  BOOK_DEMO_PATH,
  CAPITAL_PLANNING_PATH,
  FACILITIES_OPS_PATH,
  MV_PATH,
  SCHOOL_ENERGY_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Capital planning', path: CAPITAL_PLANNING_PATH },
]

const faqs: FaqItem[] = [
  {
    question: 'What is a digital twin of a building?',
    answer:
      'A digital twin is a living operational model of how your building actually behaves, built from the data Edviro already collects: bills, meters, BMS points, weather, tariffs, occupancy, asset records, and every work order and fix. It is not a 3D drawing. It is a model accurate enough to answer "what happens if we change this?" before you change it.',
  },
  {
    question: 'Where does the maintenance history in the capital plan come from?',
    answer:
      'From the work itself. Every work order, inspection, repair, and cost is logged against the asset as the team completes it, so repeated failures and rising repair cost show up on the equipment record automatically. Edviro flags those patterns for repair-or-replace review and carries the evidence into projects and multi-year priorities—no separate data-gathering exercise before budget season.',
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
  title: 'Capital Planning for School Facilities',
  description:
    'Edviro turns asset history, work orders, bills, meters, and BMS data into a living model of each building, then simulates replacements, retrofits, and schedule changes so districts can rank capital projects by real payback before spending a dollar.',
  path: CAPITAL_PLANNING_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro capital planning and intervention simulation',
      description:
        'Simulation of building interventions and capital projects against a living operational model of each building, ranked by projected payback, connected to maintenance history, and verified after the fact.',
      path: CAPITAL_PLANNING_PATH,
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
          <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Capital planning</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 62px); line-height: 1.05; letter-spacing: -0.035em;">Test the project before you spend the budget.</h1>
          <p style="margin: 26px 0 0; max-width: 640px; font-size: 19px; line-height: 1.6; color: #4B5550;">Every bill, meter reading, BMS point, asset record, and work order Edviro touches builds a living operational model of your building—a digital twin. Use it to simulate replacements, retrofits, and schedule changes, and rank capital projects by real payback before committing a dollar.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- DEFINITION -->
    <section style="padding: 20px 32px 60px;">
      <div style="max-width: 820px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 16px; font-weight: 400; font-size: clamp(26px, 3.4vw, 38px); line-height: 1.1; letter-spacing: -0.025em;">Capital decisions, made with evidence.</h2>
        <p style="margin: 0 0 16px; font-size: 17px; line-height: 1.7; color: #4B5550;">Most capital plans are built on equipment age, vendor quotes, and gut feel. The data that could answer the real questions — replace or repair? which retrofit pays back first? what does the new wing do to demand charges? — is scattered across bills, spreadsheets, BMS exports, and work-order systems where no one can use it.</p>
        <p style="margin: 0 0 16px; font-size: 17px; line-height: 1.7; color: #4B5550;">Edviro already pulls that data into one place to run your buildings day to day. Capital planning is what it compounds into: a living operational model of each building, accurate enough to simulate an intervention and project its payback before you bring it to the board.</p>
        <p style="margin: 0; font-size: 17px; line-height: 1.7; color: #4B5550;">The maintenance side feeds the plan directly. <RouterLink :to="ASSETS_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">Asset records and equipment history</RouterLink> accumulate as work orders and inspections are completed; repeated failures and rising repair cost flag equipment for repair-or-replace review; and projects carry an owner, a funding source, and a budget so the multi-year priority list traces back to what actually happened in the buildings. That is the connection between today's work order and tomorrow's <RouterLink :to="FACILITIES_OPS_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">facilities operations</RouterLink> plan.</p>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section style="padding: 50px 32px; background: #101815; color: #EDF0EE;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #79867E;">How it works</p>
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.8vw, 44px); line-height: 1.06; letter-spacing: -0.03em; color: #F2F5F1; max-width: 640px;">A model that learns, simulations you can defend.</h2>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #26302A; border: 1px solid #26302A; border-radius: 16px; overflow: hidden;">
          <div style="background: #17201B; padding: 28px;">
            <div style="font-weight: 600; font-size: 12px; color: #6FCF97; margin-bottom: 14px;">01 / Model</div>
            <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: #EDF0EE;">Build the model</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #C4CBC5;">Every data source Edviro connects, every work order, and every fix it verifies feeds a living operational model of each building. No extra setup, it comes from running your operations.</p>
          </div>
          <div style="background: #17201B; padding: 28px;">
            <div style="font-weight: 600; font-size: 12px; color: #6FCF97; margin-bottom: 14px;">02 / Simulate</div>
            <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: #EDF0EE;">Test the intervention</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #C4CBC5;">Run replacements, retrofits, schedule changes, and rate scenarios against the model. See projected savings and payback from your real usage, not industry averages.</p>
          </div>
          <div style="background: #17201B; padding: 28px;">
            <div style="font-weight: 600; font-size: 12px; color: #6FCF97; margin-bottom: 14px;">03 / Decide</div>
            <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: #EDF0EE;">Rank and prove</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #C4CBC5;">Bring the board a prioritized capital plan with modeled payback for each option, then <RouterLink :to="MV_PATH" class="text-link" style="color: #6FCF97; text-decoration: none; font-weight: 500;">verified results</RouterLink> after the work is done.</p>
          </div>
        </div>
        <div style="margin-top: 28px; display: inline-flex; align-items: baseline; gap: 12px; font-weight: 500; font-size: 12px; color: #79867E;">
          <span style="color: #6FCF97; font-size: 15px;">Replace vs. repair</span> answered from your own meter data, before the purchase order
        </div>
      </div>
    </section>

    <!-- WHO USES IT -->
    <section style="padding: 56px 32px 20px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 28px; font-weight: 400; font-size: clamp(26px, 3.4vw, 38px); line-height: 1.1; letter-spacing: -0.025em;">Where simulation matters most</h2>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <RouterLink :to="SCHOOL_ENERGY_PATH" class="card-link" style="text-decoration: none; color: inherit; border: 1px solid #D8DED9; border-radius: 16px; padding: 24px; background: #F9FAF9; display: block;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 6px;">Schools &rarr;</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #5F6B65;">Walk into budget and bond season with a ranked project list and the data behind it.</p>
          </RouterLink>
          <RouterLink to="/solutions/data-centers/" class="card-link" style="text-decoration: none; color: inherit; border: 1px solid #D8DED9; border-radius: 16px; padding: 24px; background: #F9FAF9; display: block;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 6px;">Data centers &rarr;</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #5F6B65;">Find how many racks a site can take before cooling is the constraint — simulated before you commit.</p>
          </RouterLink>
          <RouterLink to="/solutions/construction/" class="card-link" style="text-decoration: none; color: inherit; border: 1px solid #D8DED9; border-radius: 16px; padding: 24px; background: #F9FAF9; display: block;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 6px;">Construction &rarr;</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #5F6B65;">Compare the as-built twin to the design model and catch variance before handover.</p>
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
  border-color: #171D1A !important;
}
.text-link:hover {
  text-decoration: underline;
}
</style>
