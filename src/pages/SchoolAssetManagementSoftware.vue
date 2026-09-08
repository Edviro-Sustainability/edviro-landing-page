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
  CMMS_PATH,
  FACILITIES_OPS_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'School asset management software', path: ASSETS_PATH },
]

/** Intent boundary for this page: registry, hierarchy, documents, history, inspections, lifecycle planning. */
const registry = [
  { title: 'Registry', body: 'Every piece of equipment worth tracking—boilers, chillers, rooftop units, pumps, panels, controllers, kitchen and grounds equipment—with type, make and model, age, and nameplate details. Nameplate photos can be read into the record instead of retyped.' },
  { title: 'Hierarchy', body: 'District → school → building → system → asset. A rooftop unit knows which zones it serves; a boiler knows which plant it belongs to. Work and signals roll up the same way the buildings do.' },
  { title: 'Documents', body: 'Manuals, submittals, warranty terms, drawings, and photos live on the asset, so the technician in the mechanical room has them and the planner reviewing replacements does too.' },
  { title: 'History', body: 'Every work order, repair, part, and cost is logged against the asset automatically as work is completed. The history that used to live in one veteran\'s head is on the record for whoever comes next.' },
  { title: 'Inspections', body: 'Recurring inspections and preventive tasks are scheduled per asset and completed from a phone or tablet with checklist, photos, and readings. Findings can open work directly.' },
  { title: 'Lifecycle planning', body: 'Repeated failures, rising repair cost, and age flag assets for repair-or-replace review. The analysis is modeled against real operating data and carried into projects and the capital plan.' },
]

const faqs: FaqItem[] = [
  {
    question: 'What does an asset record in Edviro include?',
    answer:
      'Type, make and model, age, and nameplate details; its place in the district → school → building → system hierarchy; manuals, warranties, drawings, and photos; every work order, repair, part, and cost logged against it; scheduled inspections and preventive tasks; and related building and energy signals. Work orders and inspections attach automatically as the team works, so history builds itself. Districts can run assets and work orders in Edviro or connect an existing CMMS.',
  },
  {
    question: 'How does Edviro help prioritize preventive maintenance?',
    answer:
      'Preventive tasks are scheduled per asset, and their priority is informed by the record: equipment with repeated failures, high repair cost, or abnormal behavior in building and energy data—short cycling, runtime creeping up—moves up the list. The result is a preventive maintenance schedule ordered by what the history and the data say, rather than by the calendar alone.',
  },
  {
    question: 'How does asset history feed repair-or-replace decisions?',
    answer:
      'Failures, repairs, and costs accumulate on the asset record, so Edviro can show which equipment is consuming the most attention and money. When a pattern emerges—repeated failures, rising repair cost, age—the asset is flagged for review, both options are modeled against the building\'s real operating data, and the evidence carries into projects, budgets, and multi-year capital priorities that trace back to the maintenance record.',
  },
  {
    question: 'How do we get our existing asset list into Edviro?',
    answer:
      'Existing asset inventories—from a CMMS export, a facility condition assessment, or a spreadsheet—are imported and mapped to buildings and systems during onboarding. Gaps can be filled in the field by photographing nameplates, and the registry improves as work is completed against it.',
  },
  {
    question: 'Can technicians update asset records in the field?',
    answer:
      'Yes. Inspections, photos, readings, notes, and completed work are recorded from a phone or tablet and attach to the asset immediately, so the record reflects what the technician actually found.',
  },
]

usePageSeo({
  title: 'School Asset Management Software',
  description:
    'Track school facility assets, equipment history, inspections, documents, and service records in Edviro, and connect repeated failures to preventive maintenance and capital planning.',
  path: ASSETS_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro school asset management software',
      description:
        'Asset registry, equipment hierarchy, documents, service history, inspections, and lifecycle planning for school facilities.',
      path: ASSETS_PATH,
      serviceType: 'School facility asset management software',
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
          <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Assets and inspections</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.2vw, 60px); line-height: 1.05; letter-spacing: -0.035em;">Asset management software for <span style="color: var(--accent);">school facilities</span></h1>
          <p style="margin: 26px 0 0; max-width: 660px; font-size: 19px; line-height: 1.6; color: #4B5550;">Every boiler, rooftop unit, pump, and panel with its documents, inspections, and complete service history on one record—built automatically as your team works, and connected to the maintenance backlog and the capital plan.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</RouterLink>
            <RouterLink :to="WORK_ORDERS_PATH" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #171D1A; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #C0CCC3;">See the work-order system</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY -->
    <section style="padding: 30px 32px 70px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 720px;">The equipment history a district actually has is in someone's head.</h2>
        <p style="margin: 0 0 40px; max-width: 760px; font-size: 17px; line-height: 1.6; color: #4B5550;">School facility asset tracking usually means a facility condition assessment from a few years ago, a spreadsheet nobody trusts, and a lead technician who remembers which unit always fails in August. When that person retires, the history goes with them. Edviro builds the record as a by-product of doing the work—every work order, inspection, and repair lands on the asset—so equipment maintenance history is something the district owns.</p>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">History builds itself</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">No separate data-entry step. Completing work in Edviro is what writes the service history.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Signals attach to assets</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">Short cycling, runtime creep, and related alarms show up on the equipment they concern, not in a separate alarm list.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Patterns become decisions</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">Repeated failures and rising cost are flagged for repair-or-replace review and carried into the capital plan.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- REGISTRY -->
    <section id="registry" style="padding: 80px 32px; background: #F5F7F5; border-top: 1px solid #E3E8E4; border-bottom: 1px solid #E3E8E4;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">What is on the record</p>
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 720px;">Registry, hierarchy, documents, history, inspections, lifecycle.</h2>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
          <div v-for="item in registry" :key="item.title" style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 16px; padding: 22px 22px 20px;">
            <h3 style="margin: 0 0 10px; font-size: 18px; font-weight: 600; letter-spacing: -0.01em;">{{ item.title }}</h3>
            <p style="margin: 0; font-size: 15px; line-height: 1.55; color: #5F6B65;">{{ item.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ASSET RECORD ILLUSTRATION -->
    <section style="padding: 90px 32px 70px;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">From one asset to the capital plan</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em;">The third failure is already evidence.</h2>
          <p style="margin: 0 0 16px; font-size: 17px; line-height: 1.6; color: #4B5550;">When the same rooftop unit needs a belt for the third time in a year, Edviro has the dates, the cost, the technician notes, and the runtime data that preceded each one. It flags the unit for repair-or-replace review, models both options against the building's real operating data, and—if replacement wins—carries it into a project with an owner, a funding source, and a place in the multi-year plan.</p>
          <p style="margin: 0; font-size: 17px; line-height: 1.6; color: #4B5550;">That is how <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">capital planning</RouterLink> stops being a wish list and starts being a record.</p>
        </div>
        <div style="background: #101815; border-radius: 22px; padding: 30px; box-shadow: 0 40px 80px -40px rgba(0,0,0,0.45);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <span style="font-weight: 600; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #79867E;">Asset · RTU-7 · Jefferson ES</span>
            <span style="font-weight: 600; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #101815; background: #E0B15C; padding: 3px 9px; border-radius: 999px;">Repair-or-replace review</span>
          </div>
          <div style="background: #17201B; border: 1px solid #26302A; border-radius: 14px; padding: 18px;">
            <div style="font-size: 12.5px; color: #A7B4AB; line-height: 1.6; margin-bottom: 14px;">Carrier 48TC · 10 ton · installed 2011 · serves Rooms 210–218 · manual and warranty attached</div>
            <div style="font-weight: 600; font-size: 11px; color: #79867E; margin-bottom: 8px;">SERVICE HISTORY · LAST 12 MONTHS</div>
            <div style="display: grid; gap: 8px; font-size: 13.5px; color: #C4CBC5;">
              <div style="display: flex; justify-content: space-between; gap: 12px;"><span>Belt replaced · WO #4102</span><span style="color: #79867E;">Oct</span></div>
              <div style="display: flex; justify-content: space-between; gap: 12px;"><span>Belt replaced, pulley aligned · WO #4477</span><span style="color: #79867E;">Feb</span></div>
              <div style="display: flex; justify-content: space-between; gap: 12px;"><span>Belt replaced · WO #4821 · runtime +18% before failure</span><span style="color: #79867E;">Aug</span></div>
              <div style="display: flex; justify-content: space-between; gap: 12px;"><span>Quarterly inspection · filter, coil, drain</span><span style="color: #79867E;">×4</span></div>
            </div>
          </div>
          <div style="margin-top: 16px; display: flex; align-items: center; justify-content: space-between; font-weight: 500; font-size: 11px; color: #79867E;">
            <span>Pattern flagged · 3 failures / 12 mo</span>
            <span style="color: #6FCF97;">added to FY27 capital review</span>
          </div>
          <p style="margin: 14px 0 0; font-size: 12px; color: #79867E; line-height: 1.5;">Illustrative asset record.</p>
        </div>
      </div>
    </section>

    <!-- CONNECTIONS -->
    <section style="padding: 70px 32px; background: #101815; color: #EDF0EE;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; color: #F2F5F1; max-width: 720px;">Asset records make the rest of the platform smarter.</h2>
        <p style="margin: 0 0 28px; max-width: 760px; font-size: 17px; line-height: 1.6; color: #C4CBC5;">Diagnostics read the history to explain a fault. Work orders carry it to the technician. Preventive maintenance is prioritized by it. Capital planning is built on it. Use Edviro's registry directly, or connect the asset data in your existing CMMS.</p>
        <div style="display: flex; gap: 22px; flex-wrap: wrap;">
          <RouterLink :to="WORK_ORDERS_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">School work-order software →</RouterLink>
          <RouterLink :to="CMMS_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">Replace or integrate your CMMS →</RouterLink>
          <RouterLink :to="{ path: FACILITIES_OPS_PATH, hash: '#preventive-maintenance' }" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">Preventive maintenance →</RouterLink>
          <RouterLink :to="FACILITIES_OPS_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">The full school facilities platform →</RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from districts" heading="Asset management FAQ" :items="faqs" />

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
.text-link:hover {
  text-decoration: underline;
}
</style>
