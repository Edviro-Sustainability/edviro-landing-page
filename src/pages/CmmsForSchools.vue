<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import {
  ASSETS_PATH,
  BLOG_URL,
  BOOK_DEMO_PATH,
  CAPITAL_PLANNING_PATH,
  CMMS_PATH,
  FACILITIES_OPS_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'CMMS for schools', path: CMMS_PATH },
]

/** Intent boundary for this page: native functionality, replacement vs. integration, migration, comparison with a conventional CMMS. */
const comparison = [
  { area: 'Work orders and requests', cmms: 'Stores tickets someone creates, assigns, and closes.', edviro: 'Same record-keeping, plus work opened from detected problems and verified against building data after closure.' },
  { area: 'Prioritization', cmms: 'Manual, or a fixed priority field set by the requester.', edviro: 'Proposed from impact—comfort, safety, cost, recurrence—for the director to review.' },
  { area: 'Assets and history', cmms: 'A registry and service log, maintained by hand.', edviro: 'The same registry, with inspections, photos, known issues, and related building and energy signals attached automatically.' },
  { area: 'Building systems and utilities', cmms: 'Usually not connected; alarms and bills live elsewhere.', edviro: 'BMS alarms, interval meters, utility bills, and schedules read alongside the work.' },
  { area: 'Preventive maintenance', cmms: 'Calendar-based recurring tasks.', edviro: 'Recurring tasks plus history-based priority and early signals from equipment behavior.' },
  { area: 'Did the fix work?', cmms: 'Closed means done.', edviro: 'Closed means verified—or reopened with evidence when the problem returns.' },
  { area: 'Capital planning', cmms: 'Export and rebuild in a spreadsheet.', edviro: 'Repeated failures and cost history carry into repair-or-replace analysis and multi-year priorities.' },
  { area: 'Energy and cost outcomes', cmms: 'Out of scope.', edviro: 'Measurement and verification against a learned baseline, in board-readable form.' },
]

const faqs: FaqItem[] = [
  {
    question: 'Can Edviro replace our existing CMMS?',
    answer:
      'Yes. Edviro includes native request intake, work orders, asset records, service history, inspections, preventive maintenance tasks, and mobile field workflows. A district that is dissatisfied with its current CMMS can run those functions in Edviro and retire the old system. Migration of existing asset lists and open work orders is scoped with your team before cutover.',
  },
  {
    question: 'Can Edviro work with the CMMS we already use?',
    answer:
      'Yes. Districts that want to keep their current system can connect it: Edviro detects and diagnoses problems, routes the resulting work into the existing CMMS, and reads the outcome back to verify the fix. Monitoring, diagnostics, verification, and capital planning work the same either way. Integration scope is confirmed system by system—Edviro does not claim compatibility with every product.',
  },
  {
    question: 'How is Edviro different from a traditional CMMS?',
    answer:
      'A traditional CMMS is a system of record that waits for people to enter, prioritize, assign, and close work. Edviro keeps the same records but connects them to what the buildings are actually doing: it can open work from a detected problem, attach the likely cause and asset history, propose priority, and confirm from building and energy data that a closed work order resolved the issue. It also carries maintenance history into capital planning and measures cost and energy outcomes—functions a conventional CMMS leaves to spreadsheets.',
  },
  {
    question: 'What happens to our existing work orders and asset data if we switch?',
    answer:
      'Asset lists, open work orders, and useful history are imported so the record does not start from zero. What to bring over, how to map locations and equipment, and when to cut over are agreed with your facilities team during onboarding rather than assumed.',
  },
  {
    question: 'Do we have to decide between replacing and integrating up front?',
    answer:
      'No. Many districts start with energy monitoring and diagnostics connected to their current CMMS, then move work orders and assets into Edviro later once the team is comfortable. The choice is not permanent in either direction.',
  },
]

usePageSeo({
  title: 'CMMS for Schools: Replace or Integrate',
  description:
    'Compare Edviro\'s native CMMS for schools with a traditional CMMS. Use Edviro for work orders and assets, or integrate your existing system, and connect maintenance to energy and capital planning.',
  path: CMMS_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro CMMS for schools',
      description:
        'Native computerized maintenance management for school districts—work orders, assets, inspections, preventive maintenance, mobile field workflows—with the option to integrate an existing CMMS instead.',
      path: CMMS_PATH,
      serviceType: 'CMMS software for schools',
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
        <div style="max-width: 800px;">
          <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">CMMS software for schools</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.2vw, 60px); line-height: 1.05; letter-spacing: -0.035em;">A CMMS for schools you can adopt—<span style="color: var(--accent);">or connect to the one you have</span></h1>
          <p style="margin: 26px 0 0; max-width: 680px; font-size: 19px; line-height: 1.6; color: #4B5550;">A computerized maintenance management system (CMMS) keeps the record of work orders and assets. Edviro keeps that record too—and connects it to the buildings, so problems are found in the data, work is prioritized by impact, and every closed work order is verified.</p>
          <p style="margin: 16px 0 0; max-width: 640px; font-size: 16px; line-height: 1.55; color: #171D1A; font-weight: 500;">Use Edviro as your work-order and asset system—or connect the systems you already have.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</RouterLink>
            <a href="#comparison" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #171D1A; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #C0CCC3;">See the comparison</a>
          </div>
        </div>
      </div>
    </section>

    <!-- TWO PATHS -->
    <section id="paths" style="padding: 30px 32px 70px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 720px;">Two ways to run it. Same outcome.</h2>
        <p style="margin: 0 0 36px; max-width: 760px; font-size: 17px; line-height: 1.6; color: #4B5550;">Districts unhappy with their current system—slow to update, ignored by technicians, disconnected from the buildings—can replace it. Districts that like theirs can keep it. Edviro does not require either decision to get value from monitoring, diagnostics, and verification.</p>
        <div class="r-cols-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 18px; padding: 28px;">
            <p style="margin: 0 0 10px; font-weight: 600; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent);">Replace</p>
            <h3 style="margin: 0 0 12px; font-size: 21px; font-weight: 600; letter-spacing: -0.01em;">Use Edviro as your CMMS</h3>
            <p style="margin: 0 0 16px; font-size: 15.5px; line-height: 1.6; color: #4B5550;">Native request intake, work orders, asset registry, service history, inspections, preventive maintenance, and mobile field workflows. One record from the first signal to the verified fix, with cost and energy outcomes on the same page.</p>
            <ul style="margin: 0; padding: 0 0 0 18px; font-size: 14.5px; line-height: 1.6; color: #5F6B65;">
              <li>Asset lists and open work imported during onboarding</li>
              <li>Cutover planned with your team, by site or by trade</li>
              <li>Technicians on phone or tablet from day one</li>
            </ul>
          </div>
          <div style="background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 18px; padding: 28px;">
            <p style="margin: 0 0 10px; font-weight: 600; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent);">Integrate</p>
            <h3 style="margin: 0 0 12px; font-size: 21px; font-weight: 600; letter-spacing: -0.01em;">Connect your existing CMMS</h3>
            <p style="margin: 0 0 16px; font-size: 15.5px; line-height: 1.6; color: #4B5550;">Edviro finds and diagnoses the problem, routes the work into the system your team already uses, and reads the outcome back to verify it. Your technicians keep their workflow; your director gets the diagnostics, prioritization, and verification.</p>
            <ul style="margin: 0; padding: 0 0 0 18px; font-size: 14.5px; line-height: 1.6; color: #5F6B65;">
              <li>Integration scope confirmed system by system</li>
              <li>Start with energy and diagnostics; expand later if you choose</li>
              <li>No forced migration</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- COMPARISON -->
    <section id="comparison" style="padding: 80px 32px; background: #F5F7F5; border-top: 1px solid #E3E8E4; border-bottom: 1px solid #E3E8E4;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Comparison</p>
        <h2 style="margin: 0 0 16px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 720px;">A traditional CMMS versus Edviro.</h2>
        <p style="margin: 0 0 36px; max-width: 760px; font-size: 16px; line-height: 1.6; color: #4B5550;">This compares categories of capability, not a specific vendor. Conventional CMMS products vary; the pattern below is what most school districts describe.</p>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: separate; border-spacing: 0; background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 16px; overflow: hidden; font-size: 15px; line-height: 1.5;">
            <thead>
              <tr style="background: #F9FAF9;">
                <th scope="col" style="text-align: left; padding: 14px 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #75817B; border-bottom: 1px solid #D8DED9;">Area</th>
                <th scope="col" style="text-align: left; padding: 14px 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #75817B; border-bottom: 1px solid #D8DED9;">Traditional CMMS</th>
                <th scope="col" style="text-align: left; padding: 14px 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); border-bottom: 1px solid #D8DED9;">Edviro</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparison" :key="row.area">
                <th scope="row" style="text-align: left; vertical-align: top; padding: 14px 18px; font-weight: 600; color: #171D1A; border-bottom: 1px solid #E3E8E4; min-width: 170px;">{{ row.area }}</th>
                <td style="vertical-align: top; padding: 14px 18px; color: #5F6B65; border-bottom: 1px solid #E3E8E4; min-width: 220px;">{{ row.cmms }}</td>
                <td style="vertical-align: top; padding: 14px 18px; color: #171D1A; border-bottom: 1px solid #E3E8E4; min-width: 260px;">{{ row.edviro }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- MIGRATION -->
    <section id="migration" style="padding: 90px 32px 70px;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Migration</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em;">Switching without losing the record.</h2>
          <p style="margin: 0; font-size: 17px; line-height: 1.6; color: #4B5550;">If you replace, the history matters: which assets exist, what has been done to them, and what is still open. Edviro imports asset lists, open work orders, and useful service history, maps them to buildings and equipment, and cuts over on a schedule your team sets—by site or by trade. Technicians move to the mobile workflow with their current assignments already in it.</p>
        </div>
        <ol style="list-style: none; margin: 0; padding: 0; display: grid; gap: 10px;">
          <li v-for="(s, i) in ['Export assets, open work, and history from the current system', 'Map locations, equipment, and trades with your team', 'Import and review the record before cutover', 'Cut over by site or by trade; technicians onboarded on mobile', 'Retire the old system once the record is confirmed']" :key="s" style="display: flex; gap: 14px; align-items: center; background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 12px; padding: 14px 16px;">
            <span style="flex: none; width: 28px; height: 28px; border-radius: 8px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 12.5px;">{{ i + 1 }}</span>
            <span style="font-size: 15px; font-weight: 500; color: #171D1A;">{{ s }}</span>
          </li>
        </ol>
      </div>
    </section>

    <!-- BEYOND THE CMMS -->
    <section style="padding: 70px 32px; background: #101815; color: #EDF0EE;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; color: #F2F5F1; max-width: 720px;">A CMMS is where Edviro keeps the record. It is not where Edviro stops.</h2>
        <p style="margin: 0 0 28px; max-width: 760px; font-size: 17px; line-height: 1.6; color: #C4CBC5;">The same record feeds energy monitoring and diagnostics, asset lifecycle decisions, and the capital plan—so the work your team does every day becomes evidence for the budget conversation, not just a closed ticket count.</p>
        <div style="display: flex; gap: 22px; flex-wrap: wrap;">
          <RouterLink :to="WORK_ORDERS_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">School work-order software →</RouterLink>
          <RouterLink :to="ASSETS_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">School asset management →</RouterLink>
          <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">Capital planning →</RouterLink>
          <RouterLink :to="FACILITIES_OPS_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">The full school facilities platform →</RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from districts" heading="CMMS for schools FAQ" :items="faqs" />

    <section style="padding: 0 32px 90px;">
      <div style="max-width: 820px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 14px; font-weight: 600; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #75817B;">Related reading</p>
        <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; font-size: 15.5px;">
          <li><a :href="`${BLOG_URL}/blog/cmms-vs-ai-native-om-platform-for-school-districts/`" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">CMMS vs. AI-native O&amp;M platform: what school districts actually need</a></li>
          <li><a :href="`${BLOG_URL}/blog/what-ai-powered-operations-and-maintenance-means-for-a-school-district/`" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">What AI-powered operations and maintenance means for a school district</a></li>
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
.text-link:hover {
  text-decoration: underline;
}
</style>
