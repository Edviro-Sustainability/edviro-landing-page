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
  CMMS_PATH,
  FACILITIES_OPS_PATH,
  MV_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'School work-order software', path: WORK_ORDERS_PATH },
]

/** Intent boundary for this page: intake → triage → priority → assignment → technician updates → closure → verification. */
const lifecycle = [
  {
    title: 'Intake',
    body: 'Teachers, office staff, and custodians submit requests through the web or supported messaging workflows. Edviro can also open work itself from a detected problem—an after-hours runtime pattern, a short-cycling boiler, an inspection finding—so the queue is not only what people remembered to report.',
  },
  {
    title: 'Triage',
    body: 'Each request is categorized (HVAC, plumbing, electrical, grounds, custodial, safety) and matched to the building, the likely asset, and any related alarms, energy signals, or open work. Duplicates of an issue already in progress are surfaced instead of becoming a second ticket.',
  },
  {
    title: 'Priority',
    body: 'Priority is proposed from impact—comfort, safety, cost, occupancy, and whether the asset has a history of the same fault—so the director reviews an ordered list rather than building one by hand.',
  },
  {
    title: 'Assignment',
    body: 'Route by school, asset, project, or trade to in-house staff or a contractor. Technicians are notified on their phone or tablet with the priority, location, and asset record attached.',
  },
  {
    title: 'Technician updates',
    body: 'Photos, readings, inspection results, parts, and notes are added from the field. Status is visible to the requester and the director without a phone call.',
  },
  {
    title: 'Closure',
    body: 'Completion is recorded against the asset\'s service history with labor, parts, and contractor cost, so the same problem next year starts from a record, not a memory.',
  },
  {
    title: 'Verification',
    body: 'After closure, Edviro checks the subsequent building and energy data. If the runtime pattern, fault, or consumption returns, the work order is reopened with the evidence attached rather than quietly counted as done.',
  },
]

const faqs: FaqItem[] = [
  {
    question: 'Does Edviro support work orders and asset management?',
    answer:
      'Yes. Edviro includes a native work-order system—request intake, AI-assisted categorization and priority, assignment, mobile technician notifications and updates, closure with cost, and verification against building data—and a native asset registry with service history, inspections, and documents. Districts can use these instead of a separate CMMS or connect the CMMS they already have.',
  },
  {
    question: 'Can Edviro connect BAS or energy anomalies to work orders?',
    answer:
      'Yes. When Edviro detects a problem in building automation system (BAS) data, utility bills, or interval meter data, it can open a work order with the likely cause, the affected asset, and the supporting data attached—or route that work into your existing CMMS. Requests submitted by staff and alerts detected in the data land in the same queue with the same prioritization.',
  },
  {
    question: 'How does Edviro verify that completed work fixed the problem?',
    answer:
      'Every work order is tied to the signal that created it or the asset it concerns. After the work is closed, Edviro watches the relevant building and energy data—runtime, cycling, consumption against the learned baseline—to confirm the condition actually stopped. If it comes back, the work order is reopened with the evidence, so a closed ticket means a resolved problem, not just a completed visit.',
  },
  {
    question: 'Can technicians use Edviro in the field?',
    answer:
      'Yes. Technicians receive assignments and priority changes on a phone or tablet, open the asset record and last service notes, follow step-by-step guidance or an inspection checklist, attach photos and readings, and mark the work complete from the site.',
  },
  {
    question: 'Can Edviro work with the CMMS we already use?',
    answer:
      'Yes. Edviro can find and diagnose problems and route the resulting work into a district\'s existing CMMS, then read the outcome back for verification. Integration scope is confirmed system by system. Districts that would rather consolidate can run work orders and assets in Edviro directly.',
  },
]

usePageSeo({
  title: 'School Work Order Software',
  description:
    'Edviro\'s school work order software handles request intake, AI-assisted triage and priority, assignment, mobile technician updates, closure, and verification that the fix worked—natively or with your existing CMMS.',
  path: WORK_ORDERS_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro school work-order software',
      description:
        'Work-order management for school districts: intake, AI-assisted triage and priority, assignment, mobile technician workflows, closure, and verification against building data.',
      path: WORK_ORDERS_PATH,
      serviceType: 'School work-order management software',
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
          <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Work orders and maintenance</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.2vw, 60px); line-height: 1.05; letter-spacing: -0.035em;">Work order software built for <span style="color: var(--accent);">school maintenance teams</span></h1>
          <p style="margin: 26px 0 0; max-width: 660px; font-size: 19px; line-height: 1.6; color: #4B5550;">Edviro's school work order software takes a request or a detected problem from intake through triage, priority, assignment, and field completion—then verifies in the building data that the problem is actually gone.</p>
          <p style="margin: 16px 0 0; max-width: 640px; font-size: 16px; line-height: 1.55; color: #171D1A; font-weight: 500;">Use it as your work-order system, or connect the one you already have.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</RouterLink>
            <RouterLink :to="CMMS_PATH" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #171D1A; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #C0CCC3;">Replace or integrate your CMMS</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY A SCHOOL-SPECIFIC WORK ORDER SYSTEM -->
    <section style="padding: 30px 32px 70px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 720px;">A work order should end when the problem does—not when someone shows up.</h2>
        <p style="margin: 0 0 40px; max-width: 760px; font-size: 17px; line-height: 1.6; color: #4B5550;">Most maintenance work order software for schools is a ticket queue: requests come in, get assigned, get closed. Nobody checks whether the gym is still cold on Monday or whether the boiler is still short-cycling. Edviro is built around the missing step. Because it reads the same building and energy data that revealed the problem, it can confirm the fix—and reopen the work with evidence when it did not hold.</p>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Requests and detections in one queue</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">A teacher's "too hot" request and a detected stuck damper are often the same problem. Edviro puts them together instead of in two systems.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Triage that automates the paperwork</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">Categorization, likely asset, related history, and proposed priority are drafted for the director to review—not typed from scratch at 6 a.m.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Closure with proof</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">Completion is recorded with cost against the asset, and verification runs in the data afterwards. The record shows the outcome, not just the visit.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LIFECYCLE -->
    <section id="lifecycle" style="padding: 80px 32px; background: #F5F7F5; border-top: 1px solid #E3E8E4; border-bottom: 1px solid #E3E8E4;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">The work-order lifecycle</p>
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 720px;">Seven steps, one record.</h2>
        <ol style="list-style: none; margin: 0; padding: 0; display: grid; gap: 12px;">
          <li v-for="(step, i) in lifecycle" :key="step.title" class="r-split" style="display: grid; grid-template-columns: 260px 1fr; gap: 24px; background: #FFFFFF; border: 1px solid #D8DED9; border-radius: 16px; padding: 22px 24px;">
            <div style="display: flex; align-items: flex-start; gap: 12px;">
              <span style="flex: none; width: 30px; height: 30px; border-radius: 9px; background: color-mix(in oklab, var(--accent) 10%, #fff); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px;">{{ i + 1 }}</span>
              <h3 style="margin: 4px 0 0; font-size: 18px; font-weight: 600; letter-spacing: -0.01em;">{{ step.title }}</h3>
            </div>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #4B5550;">{{ step.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- BACKLOG AND REVIEW -->
    <section style="padding: 90px 32px 70px;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Backlog and review</p>
          <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em;">See what is open, what is late, and what should move first.</h2>
          <p style="margin: 0 0 16px; font-size: 17px; line-height: 1.6; color: #4B5550;">The director's view is the backlog by impact: overdue work, requests waiting on parts or a contractor, and issues that keep recurring on the same asset. Each item carries its reasoning—why it was prioritized, what has been tried, what the data shows—so weekly review is a decision, not a reconstruction.</p>
          <p style="margin: 0; font-size: 17px; line-height: 1.6; color: #4B5550;">Repeated work on the same equipment is flagged automatically and can be handed to <RouterLink :to="ASSETS_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">asset management</RouterLink> for a repair-or-replace review.</p>
        </div>
        <div style="background: #101815; border-radius: 22px; padding: 30px; box-shadow: 0 40px 80px -40px rgba(0,0,0,0.45);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            <span style="font-weight: 600; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #79867E;">Backlog · by impact</span>
            <span style="font-weight: 600; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #101815; background: #6FCF97; padding: 3px 9px; border-radius: 999px;">Illustrative</span>
          </div>
          <div style="display: grid; gap: 10px;">
            <div style="background: #17201B; border: 1px solid #26302A; border-radius: 12px; padding: 14px 16px; display: flex; justify-content: space-between; gap: 12px;">
              <div><div style="font-size: 14.5px; font-weight: 600; color: #EDF0EE;">Boiler #2 short-cycling · Lincoln HS</div><div style="font-size: 12px; color: #79867E; margin-top: 3px;">3rd occurrence · overdue 2 days · zone tech</div></div>
              <span style="font-size: 11px; font-weight: 600; color: #E0B15C; white-space: nowrap;">HIGH</span>
            </div>
            <div style="background: #17201B; border: 1px solid #26302A; border-radius: 12px; padding: 14px 16px; display: flex; justify-content: space-between; gap: 12px;">
              <div><div style="font-size: 14.5px; font-weight: 600; color: #EDF0EE;">Room 214 too hot · matched to stuck damper</div><div style="font-size: 12px; color: #79867E; margin-top: 3px;">request + BMS signal · assigned · parts ordered</div></div>
              <span style="font-size: 11px; font-weight: 600; color: #E0B15C; white-space: nowrap;">HIGH</span>
            </div>
            <div style="background: #17201B; border: 1px solid #26302A; border-radius: 12px; padding: 14px 16px; display: flex; justify-content: space-between; gap: 12px;">
              <div><div style="font-size: 14.5px; font-weight: 600; color: #EDF0EE;">Gym lights on after 9pm · Roosevelt MS</div><div style="font-size: 12px; color: #79867E; margin-top: 3px;">schedule change proposed · awaiting approval</div></div>
              <span style="font-size: 11px; font-weight: 600; color: #A7B4AB; white-space: nowrap;">MEDIUM</span>
            </div>
            <div style="background: #17201B; border: 1px solid #26302A; border-radius: 12px; padding: 14px 16px; display: flex; justify-content: space-between; gap: 12px;">
              <div><div style="font-size: 14.5px; font-weight: 600; color: #EDF0EE;">RTU-7 belt · Jefferson ES</div><div style="font-size: 12px; color: #79867E; margin-top: 3px;">closed Tue · verifying · runtime normal so far</div></div>
              <span style="font-size: 11px; font-weight: 600; color: #6FCF97; white-space: nowrap;">VERIFYING</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- REPLACE OR INTEGRATE -->
    <section style="padding: 70px 32px; background: #101815; color: #EDF0EE;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; color: #F2F5F1; max-width: 720px;">Replace your current work-order system or connect Edviro to it.</h2>
        <p style="margin: 0 0 28px; max-width: 720px; font-size: 17px; line-height: 1.6; color: #C4CBC5;">Everything on this page is native to Edviro. If your district already has a CMMS it wants to keep, Edviro can diagnose the problem and route the work into that system, then read the outcome back to verify it. The choice is yours, and it can change later.</p>
        <div style="display: flex; gap: 22px; flex-wrap: wrap;">
          <RouterLink :to="CMMS_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">Compare with a traditional CMMS →</RouterLink>
          <RouterLink :to="FACILITIES_OPS_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">See the full school facilities platform →</RouterLink>
          <RouterLink :to="MV_PATH" class="text-link" style="font-size: 15px; font-weight: 500; color: #6FCF97; text-decoration: none;">How verification works →</RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from districts" heading="Work-order software FAQ" :items="faqs" />

    <section style="padding: 0 32px 90px;">
      <div style="max-width: 820px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 14px; font-weight: 600; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #75817B;">Related reading</p>
        <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; font-size: 15.5px;">
          <li><a :href="`${BLOG_URL}/blog/from-bas-alert-to-completed-work-order/`" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">From BAS alert to completed work order: closing the facilities operations loop</a></li>
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
.text-link:hover {
  text-decoration: underline;
}
</style>
