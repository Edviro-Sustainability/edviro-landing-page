<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import {
  BLOG_URL,
  BOOK_DEMO_PATH,
  CAPITAL_PLANNING_PATH,
  FACILITIES_OPS_PATH,
  MV_PATH,
  SCHOOL_ENERGY_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

/*
 * This is the ranking energy-management URL. Its path, canonical, and primary
 * intent (energy management software for schools) must not change; the
 * facilities-operations story lives on FACILITIES_OPS_PATH and is only bridged
 * to from here.
 */
const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Energy management for schools', path: SCHOOL_ENERGY_PATH },
]

const loop = [
  { n: '01', title: 'Monitor', body: 'Electricity, gas, water, solar, demand, and cost across every site, read from your meters, utility data, and building systems.' },
  { n: '02', title: 'Spot the problem', body: 'Edviro learns how each school normally uses energy and flags abnormal changes—drift, faults, waste—as they start, not at the next audit.' },
  { n: '03', title: 'Find the likely cause', body: 'It gathers the schedule, equipment, weather, and building-system context around the anomaly and explains what is most likely happening.' },
  { n: '04', title: 'Coordinate the fix', body: 'A work order with the evidence attached goes to your team, or a schedule or setpoint change is staged for review and approval.' },
  { n: '05', title: 'Verify the result', body: 'Edviro checks the meter data afterwards and reports whether the waste stopped and the savings held.' },
]

const faqs: FaqItem[] = [
  {
    question: 'How does Edviro help school facilities teams save energy?',
    answer:
      'Edviro connects to your existing meters, building management system, and utility bills, learns how each school normally uses energy, and continuously watches for waste. When it finds a problem—a boiler short-cycling, HVAC running in an empty wing—it finds the likely cause, raises a work order with the evidence attached or stages a schedule change for your team to approve, and then confirms the savings in the meter data.',
  },
  {
    question: 'Do we need to install new hardware or replace our BMS?',
    answer:
      'No. Edviro is software that works with what you already have: your meters, building management system, sensors, and utility data. It does not replace your building controls, and no hardware install is required to get started, so districts can roll it out across many sites quickly. Where a site has no interval meter, optional metering can be added later.',
  },
  {
    question: 'Is this a replacement for a periodic energy audit?',
    answer:
      'Edviro effectively performs a continuous energy audit. Instead of waiting for a quarterly or annual audit, it catches drift, faults, and waste the moment they start and verifies every correction against a learned baseline of how the building behaved before.',
  },
  {
    question: 'Does Edviro change setpoints or schedules on its own?',
    answer:
      'Edviro proposes the change and tests it against the building\'s learned behavior first; your team reviews and approves it before anything is sent to the building. Nothing is written to a building system without authorization, and Edviro does not replace your staff, your controls contractor, or your BMS.',
  },
  {
    question: 'Can Edviro help with capital planning and bond season?',
    answer:
      'Yes. Everything Edviro learns about your schools builds a living operational model of each building—a digital twin. You can test capital projects against it, such as replacing a boiler versus keeping it tuned or modeling what a new wing does to demand charges, and walk into budget or bond season with projects ranked by modeled payback from your own data.',
  },
  {
    question: 'How quickly can a district see results?',
    answer:
      'Edviro typically connects a few sites and shows what it catches within the first week, with no upfront audit and no rip-and-replace. To date Edviro has saved clients over $400K, with 34 school sites live and expanding.',
  },
]

usePageSeo({
  title: 'Energy Management Software for Schools',
  description:
    'Edviro is AI energy management software for schools that detects waste, diagnoses building issues, coordinates corrective work, and verifies energy and cost savings.',
  path: SCHOOL_ENERGY_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro energy management software for schools',
      description:
        'AI energy management for K-12 school facilities: continuous monitoring, anomaly detection, diagnostics, coordinated corrective work, and verified savings.',
      path: SCHOOL_ENERGY_PATH,
      serviceType: 'Energy management software for schools',
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
        <div style="max-width: 780px;">
          <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">For school facilities</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.2vw, 60px); line-height: 1.05; letter-spacing: -0.035em;">Energy management software for schools that <span style="color: var(--accent);">closes the loop</span></h1>
          <p style="margin: 26px 0 0; max-width: 640px; font-size: 19px; line-height: 1.6; color: #4B5550;">Edviro gives K-12 facilities teams a continuous energy audit across every site: it detects waste as it starts, finds the likely cause, coordinates the fix with your team, and verifies the savings in the meter data. No new hardware required, and it works with the building controls you already have.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</RouterLink>
            <RouterLink :to="MV_PATH" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #171D1A; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #C0CCC3;">See how we verify savings</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY SCHOOLS -->
    <section style="padding: 30px 32px 60px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 620px;">Built for the people who run the building.</h2>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Connects what you already have</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">Your meters, your BMS, your utility bills. Edviro reads them together into one live picture of every school—no rip-and-replace of your controls.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Does the audit for you</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">A continuous energy audit for every site. The moment something drifts, Edviro catches it and explains the likely cause—not at next quarter's review.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Hands you the fix, then checks it</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">A step-by-step work order in your pocket, or a schedule change staged for your approval and tested first. Either way, Edviro confirms in the meter data that it worked.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT CLOSES THE LOOP -->
    <section id="how-it-works" style="padding: 70px 32px; background: #F5F7F5; border-top: 1px solid #E3E8E4; border-bottom: 1px solid #E3E8E4;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">How it works</p>
        <h2 style="margin: 0 0 16px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 720px;">Energy monitoring that ends in a verified fix, not another chart.</h2>
        <p style="margin: 0 0 36px; max-width: 760px; font-size: 16.5px; line-height: 1.6; color: #4B5550;">Most school energy management software stops at the dashboard. Edviro carries each finding through diagnosis, corrective work, and measurement and verification—so the district sees the savings on the bill, not just the anomaly on a screen.</p>
        <ol style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 12px;">
          <li v-for="s in loop" :key="s.n" style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 16px; padding: 22px 20px;">
            <div style="font-weight: 600; font-size: 12px; color: var(--accent); margin-bottom: 12px;">{{ s.n }}</div>
            <h3 style="margin: 0 0 8px; font-size: 17px; font-weight: 600; letter-spacing: -0.01em;">{{ s.title }}</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.55; color: #5F6B65;">{{ s.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- WHAT IT CATCHES -->
    <section style="padding: 70px 32px; background: #101815; color: #EDF0EE;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #79867E;">What Edviro catches</p>
        <h2 style="margin: 0 0 36px; font-weight: 400; font-size: clamp(28px, 3.8vw, 44px); line-height: 1.06; letter-spacing: -0.03em; color: #F2F5F1; max-width: 640px;">Waste hides in every school. Edviro finds it in the data.</h2>
        <div class="r-cols-2" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: #26302A; border: 1px solid #26302A; border-radius: 16px; overflow: hidden;">
          <div style="background: #17201B; padding: 26px;">
            <div style="font-size: 17px; font-weight: 600; color: #EDF0EE; margin-bottom: 8px;">Boiler short-cycling</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C4CBC5;">Detects a boiler starting 14 times an hour and dispatches a guided work order to reset the firing differential, then confirms the cycling stopped.</p>
          </div>
          <div style="background: #17201B; padding: 26px;">
            <div style="font-size: 17px; font-weight: 600; color: #EDF0EE; margin-bottom: 8px;">After-hours runtime</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C4CBC5;">Flags HVAC and lighting running all weekend in empty buildings and stages the corrected night setback for your team to approve.</p>
          </div>
          <div style="background: #17201B; padding: 26px;">
            <div style="font-size: 17px; font-weight: 600; color: #EDF0EE; margin-bottom: 8px;">Ventilation and comfort</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C4CBC5;">Spots CO₂ rising in a gym or classroom and proposes a ventilation schedule that restores comfort without overrunning energy.</p>
          </div>
          <div style="background: #17201B; padding: 26px;">
            <div style="font-size: 17px; font-weight: 600; color: #EDF0EE; margin-bottom: 8px;">Demand spikes</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C4CBC5;">Forecasts the peak-risk days each week and recommends pre-cooling and load shifting before the demand charge lands.</p>
          </div>
          <div style="background: #17201B; padding: 26px;">
            <div style="font-size: 17px; font-weight: 600; color: #EDF0EE; margin-bottom: 8px;">Unexpected gas or water use</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C4CBC5;">Catches a gas meter that keeps running through a warm week, or water use that never drops overnight, and opens the investigation with the evidence attached.</p>
          </div>
          <div style="background: #17201B; padding: 26px;">
            <div style="font-size: 17px; font-weight: 600; color: #EDF0EE; margin-bottom: 8px;">Solar underperformance</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #C4CBC5;">Tracks production against expected output so a degrading array or a guarantee shortfall is raised with the installer, not discovered on the bill.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MEASUREMENT AND VERIFICATION -->
    <section style="padding: 90px 32px 70px;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Measurement and verification</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em;">Savings the business office can take to the board.</h2>
          <p style="margin: 0; font-size: 17px; line-height: 1.6; color: #4B5550;">Every fix is measured against a learned baseline of how the school behaved before. Measurement and verification (M&amp;V) is how the district knows a change actually saved what it was supposed to—Edviro produces it automatically, per site, in a form a business official or board member can read.</p>
          <RouterLink :to="MV_PATH" class="text-link" style="display: inline-block; margin-top: 22px; font-size: 15px; font-weight: 500; color: var(--accent); text-decoration: none;">How Edviro's measurement and verification works →</RouterLink>
        </div>
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Capital planning</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em;">From this year's waste to next year's projects.</h2>
          <p style="margin: 0; font-size: 17px; line-height: 1.6; color: #4B5550;">What Edviro learns about each school accumulates into a living operational model of the building. Use it to test a boiler replacement against a tune-up, or a new wing against the current tariff, and bring the board a ranked list backed by your own data.</p>
          <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link" style="display: inline-block; margin-top: 22px; font-size: 15px; font-weight: 500; color: var(--accent); text-decoration: none;">Capital planning with Edviro →</RouterLink>
        </div>
      </div>
    </section>

    <!-- BRIDGE: BEYOND ENERGY -->
    <section id="beyond-energy" style="padding: 70px 32px; background: #F5F7F5; border-top: 1px solid #E3E8E4; border-bottom: 1px solid #E3E8E4;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div class="r-split" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; align-items: center;">
          <div>
            <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Beyond energy</p>
            <h2 style="margin: 0 0 18px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em;">Go beyond energy management</h2>
            <p style="margin: 0 0 16px; font-size: 17px; line-height: 1.6; color: #4B5550;">The same operational loop can manage work orders, assets, inspections, preventive maintenance, projects, and budgets. Replace your CMMS or connect the one you already use.</p>
            <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #4B5550;">Energy is where many districts start, because the meter data reveals operational problems fast. Edviro carries those problems through resolution, maintenance, and planning.</p>
          </div>
          <div style="display: grid; gap: 10px;">
            <RouterLink :to="FACILITIES_OPS_PATH" class="card-link" style="text-decoration: none; color: inherit; border: 1px solid #D8DED9; border-radius: 14px; padding: 18px 20px; background: #FFFFFF; display: block;">
              <div style="font-size: 16.5px; font-weight: 600; margin-bottom: 4px;">School facilities operations platform →</div>
              <p style="margin: 0; font-size: 14.5px; line-height: 1.55; color: #5F6B65;">Work orders, assets, inspections, preventive maintenance, projects, budgets, and energy in one place.</p>
            </RouterLink>
            <RouterLink :to="WORK_ORDERS_PATH" class="card-link" style="text-decoration: none; color: inherit; border: 1px solid #D8DED9; border-radius: 14px; padding: 18px 20px; background: #FFFFFF; display: block;">
              <div style="font-size: 16.5px; font-weight: 600; margin-bottom: 4px;">School work-order software →</div>
              <p style="margin: 0; font-size: 14.5px; line-height: 1.55; color: #5F6B65;">Intake, triage, assignment, mobile completion, and verification—native, or connected to your existing CMMS.</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from districts" heading="School energy management FAQ" :items="faqs" />

    <section style="padding: 0 32px 90px;">
      <div style="max-width: 820px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 14px; font-weight: 600; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #75817B;">Related reading</p>
        <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; font-size: 15.5px;">
          <li><a :href="`${BLOG_URL}/blog/best-energy-management-software-for-schools/`" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">Best energy management software for schools: what districts should evaluate</a></li>
          <li><a :href="`${BLOG_URL}/blog/give-school-facilities-teams-their-weekends-back/`" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">Give school facilities teams their weekends back</a></li>
        </ul>
      </div>
    </section>

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
.card-link:hover {
  border-color: #171D1A !important;
}
.text-link:hover {
  text-decoration: underline;
}
</style>
