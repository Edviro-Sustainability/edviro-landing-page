<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import { BOOK_DEMO_PATH } from '@/seo/site'
import { breadcrumbLd, faqLd, serviceLd } from '@/seo/jsonld'
import { usePageSeo } from '@/seo/usePageSeo'

const path = '/solutions/school-facilities-operations/'
const description =
  'Edviro is AI-powered facilities operations software for school districts, combining energy monitoring, diagnostics, work orders, assets, inspections, capital planning, and measurement and verification.'

const faqs = [
  {
    question: 'Can Edviro replace a school district CMMS or work-order system?',
    answer:
      'Yes. Edviro includes native work-order and asset-management capabilities and can replace an incumbent system when the district chooses. It can also integrate with an existing CMMS when the district wants to keep it.',
  },
  {
    question: 'Does Edviro only work in schools with a modern building automation system?',
    answer:
      'No. Edviro can start with utility bills, interval meter data, schedules, equipment information, inspections, and work orders. Building automation integrations add more signals and, when authorized, more control options, but they are not required to begin.',
  },
  {
    question: 'Does Edviro replace facilities staff or technicians?',
    answer:
      'No. Edviro assembles evidence, helps triage requests, coordinates approved work, and verifies results. Qualified district staff and contractors remain responsible for field work, safety decisions, and authorization.',
  },
]

usePageSeo({
  title: 'School Facilities Operations Software | Work Orders, Assets & Energy',
  description,
  path,
  jsonLd: [
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'School facilities operations', path },
    ]),
    serviceLd({
      name: 'Edviro school facilities operations software',
      description,
      path,
      serviceType: 'School facilities operations, CMMS, work-order, asset, and energy management software',
      areaServed: 'United States',
    }),
    faqLd(faqs),
  ],
})
</script>

<template>
  <main>
    <section style="padding: 54px 32px 96px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <PageBreadcrumbs :items="[{ name: 'Home', path: '/' }, { name: 'School facilities operations' }]" />
        <div style="max-width: 880px; margin-top: 44px;">
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">AI-powered facilities operations for schools</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(42px, 6vw, 70px); line-height: 1.04; letter-spacing: -0.035em;">One operating system for the buildings your district depends on.</h1>
          <p style="margin: 28px 0 0; max-width: 760px; font-size: 20px; line-height: 1.6; color: #4B5550;">Edviro connects energy monitoring, diagnostics, work orders, assets, inspections, and capital planning. It helps your team find the likely cause, coordinate the response, and verify that the problem was resolved.</p>
          <p style="margin: 18px 0 0; max-width: 760px; font-size: 18px; line-height: 1.6; color: #4B5550;">Use Edviro as your CMMS and work-order system—or connect the systems you already have.</p>
          <RouterLink :to="BOOK_DEMO_PATH" style="display: inline-flex; margin-top: 32px; color: #EDF0EE; background: var(--accent); padding: 13px 24px; border-radius: 999px; font-size: 15px; font-weight: 500; text-decoration: none;">Book a demo</RouterLink>
        </div>
      </div>
    </section>

    <section style="padding: 96px 32px; background: #FFFFFF;">
      <div style="max-width: 1180px; margin: 0 auto;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">From request to resolution</p>
        <h2 style="margin: 0; max-width: 760px; font-weight: 400; font-size: clamp(34px, 4.6vw, 54px); line-height: 1.05; letter-spacing: -0.03em;">Give every issue an owner, its evidence, and a clear next step.</h2>
        <div class="r-cols-3" style="margin-top: 52px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
          <article style="padding: 28px; border: 1px solid #D8DED9; border-radius: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 21px;">Triage requests faster</h3>
            <p style="margin: 0; color: #5F6B65; line-height: 1.65;">Accept requests from staff, classify urgency, connect the right building and asset history, and route the work by trade and location.</p>
          </article>
          <article style="padding: 28px; border: 1px solid #D8DED9; border-radius: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 21px;">Equip the technician</h3>
            <p style="margin: 0; color: #5F6B65; line-height: 1.65;">Deliver assignments, notes, photos, inspection history, and related energy or controls evidence on mobile devices.</p>
          </article>
          <article style="padding: 28px; border: 1px solid #D8DED9; border-radius: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 21px;">Learn from every fix</h3>
            <p style="margin: 0; color: #5F6B65; line-height: 1.65;">Record the outcome, verify performance where data is available, and surface recurring failures before the next capital decision.</p>
          </article>
        </div>
      </div>
    </section>

    <section style="padding: 104px 32px; background: #101815; color: #EDF0EE;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #79867E;">Replace or integrate</p>
          <h2 style="margin: 0; font-weight: 400; font-size: clamp(34px, 4.4vw, 50px); line-height: 1.05; letter-spacing: -0.03em; color: #F2F5F1;">Keep what works. Consolidate what doesn’t.</h2>
        </div>
        <div>
          <p style="margin: 0; font-size: 18px; line-height: 1.7; color: #C4CBC5;">Some districts are ready to replace an outdated work-order system. Others have a CMMS their team is comfortable using. Edviro supports both paths: a native work-order and asset system for consolidation, and integrations that carry findings into the district’s existing workflow.</p>
          <p style="margin: 18px 0 0; font-size: 18px; line-height: 1.7; color: #C4CBC5;">Older schools are included. A district can begin with bills, interval data, calendars, asset records, inspections, and maintenance history, then connect controls where supported and authorized.</p>
        </div>
      </div>
    </section>

    <section style="padding: 104px 32px;">
      <div style="max-width: 920px; margin: 0 auto;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Common questions</p>
        <h2 style="margin: 0 0 38px; font-weight: 400; font-size: clamp(34px, 4.4vw, 50px); line-height: 1.05; letter-spacing: -0.03em;">A practical path to modernizing school O&amp;M.</h2>
        <details v-for="item in faqs" :key="item.question" style="padding: 22px 0; border-top: 1px solid #C9D1CB;">
          <summary style="cursor: pointer; font-size: 20px; font-weight: 600;">{{ item.question }}</summary>
          <p style="margin: 14px 0 0; max-width: 760px; color: #4B5550; line-height: 1.7;">{{ item.answer }}</p>
        </details>
        <div style="border-top: 1px solid #C9D1CB;"></div>
      </div>
    </section>
  </main>
</template>
