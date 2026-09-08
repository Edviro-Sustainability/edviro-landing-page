<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import {
  CAPITAL_PLANNING_PATH,
  CMMS_PATH,
  FACILITIES_OPS_PATH,
  FAQ_PATH,
  MV_PATH,
  SCHOOL_ENERGY_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'FAQ', path: FAQ_PATH },
]

/*
 * General-audience questions. The detailed CMMS, work-order, asset, and
 * preventive-maintenance FAQs live on their own pages so the same question
 * is not marked up in several places.
 */
const faqs: FaqItem[] = [
  {
    question: 'What is Edviro?',
    answer:
      'Edviro is an AI-powered facilities operations platform for schools. It connects building signals, work orders, assets, schedules, field teams, projects, and budgets so school facilities teams can detect problems, coordinate the response, and verify that the work succeeded. It brings energy monitoring, diagnostics, work orders, assets, and capital planning into one place, and it can serve as the district\'s work-order and asset system or connect to the systems already in use. Edviro is backed by Y Combinator.',
  },
  {
    question: 'Does Edviro include work orders, or is it only an energy tool?',
    answer:
      'Edviro includes a complete native work-order system: request intake, AI-assisted categorization and priority, assignment by school, asset, or trade, mobile notifications and instructions for technicians, photos and inspections, backlog and overdue-work review, and verification that the original problem was resolved. Energy monitoring is a major entry point because the meter data reveals operational problems quickly, but it is not the boundary of the product.',
  },
  {
    question: 'Do we have to replace our CMMS to use Edviro?',
    answer:
      'No. Use Edviro as your work-order and asset system, or connect the systems you already have. Districts dissatisfied with their current CMMS can replace it with Edviro\'s native work orders and assets; districts that like theirs can keep it and let Edviro route detected problems into it and verify the outcome. Neither choice is required to get value from monitoring, diagnostics, and verification.',
  },
  {
    question: 'What is autonomous building energy management?',
    answer:
      'Autonomous building energy management is software that does more than show a dashboard. It continuously monitors a building, detects waste and faults as they start, finds the likely cause, recommends or stages corrective action, and verifies the result in the meter data—closing the loop instead of leaving the investigation to a person. In Edviro, changes to building systems are reviewed and approved by your team before they are made.',
  },
  {
    question: 'How is Edviro different from utility tracking, monitoring software, or a BMS dashboard?',
    answer:
      'Utility tracking and monitoring tools stop at charts: they show you the waste, and the fixing stays on your plate. Edviro carries the finding through the rest of the job. It finds the likely cause, opens the work order or stages the schedule change for approval, tracks the work to completion, and then confirms in the building and energy data that the problem stopped. It works on top of your existing BMS rather than replacing it.',
  },
  {
    question: 'Do I need to replace my existing equipment or controls?',
    answer:
      'No. Edviro connects to what you already have—meters, BMS, submeters, sensors, work-order systems, and utility bills—and adapts to the data available today, from modern BMS integrations to legacy controls, utility portals, and monthly bills. Keep what works; consolidate what doesn\'t. Edviro does not replace your building controls.',
  },
  {
    question: 'How does Edviro detect energy waste and building problems?',
    answer:
      'Edviro learns each building\'s normal load, schedules, and equipment behavior from its own data. It then flags abnormal changes the moment they appear—short-cycling boilers, after-hours runtime, stuck dampers, creeping overnight base load, unexpected gas or water use, solar underperformance—and gathers the schedule, equipment, and building-system context needed to explain the likely cause.',
  },
  {
    question: 'Does Edviro take action on its own?',
    answer:
      'Edviro monitors and follows up automatically: it watches the data around the clock, investigates, drafts the work order, and checks whether the fix held. Side effects—emails, work orders, schedule or setpoint changes—are staged for your team to review and approve before they happen. Edviro does not operate building systems without authorization, and it does not replace your staff, engineers, contractors, or controls.',
  },
  {
    question: 'How does Edviro prove the savings are real?',
    answer:
      'Every change is measured against a learned baseline and confirmed in the meter data and on the bill. Edviro generates board-ready measurement and verification (M&V) automatically, shows whether savings persisted, and flags any change that did not save as expected.',
  },
  {
    question: 'What is the digital twin, and what is it for?',
    answer:
      'Everything Edviro connects and every fix it verifies builds a living operational model of each building—what engineers call a digital twin. You can test decisions against it before spending money: replace a boiler versus keep tuning it, add a wing, change a schedule, or absorb a rate change. Each simulation returns projected savings and payback from your real usage.',
  },
  {
    question: 'How does Edviro help with capital planning?',
    answer:
      'Instead of ranking capital projects by equipment age or gut feel, Edviro connects asset history, repeated failures, and repair cost to repair-or-replace analysis, simulates each candidate project against the building\'s model, and ranks them by modeled payback. When budget or bond season comes, you bring the board a prioritized list with the data behind it, and verified results on projects already funded.',
  },
  {
    question: 'Who is Edviro for?',
    answer:
      'Edviro is built for the people who run buildings: school district facilities, maintenance, and business teams first—directors of maintenance and operations, technicians in the field, business officials, and superintendents—along with construction teams that need independent baselining and verification for new builds, and data center operators who need to know how much cooling headroom a site actually has.',
  },
  {
    question: 'How does occupancy-based control work?',
    answer:
      'In commercial buildings, Edviro reads occupancy from the WiFi routers already on each floor and ties HVAC and lighting to who is actually present, so you only condition space that is in use. No new sensors are required.',
  },
  {
    question: 'How quickly can we get started and see results?',
    answer:
      'Edviro typically connects a few of your sites and shows what it catches within the first week, with no upfront audit and no rip-and-replace. To date Edviro has saved clients over $400K, with 34 school sites live and expanding.',
  },
  {
    question: 'How much does Edviro cost?',
    answer:
      'Pricing is quoted per connected site and scoped to what you turn on. The fastest way to get a tailored answer is to book a demo, where Edviro will walk through your sites and systems and what it would find.',
  },
]

usePageSeo({
  title: 'Edviro FAQ',
  description:
    'Answers to common questions about Edviro: what an AI-powered facilities operations platform does, whether it replaces or connects to your CMMS and BMS, how it detects and fixes building problems, and how it proves savings with measurement and verification.',
  path: FAQ_PATH,
  jsonLd: [organizationLd(), breadcrumbLd(breadcrumbs), faqLd(faqs)],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <!-- HERO -->
    <section style="padding: 40px 32px 24px;">
      <div style="max-width: 820px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">Frequently asked questions</p>
        <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 60px); line-height: 1.05; letter-spacing: -0.035em;">Edviro, answered.</h1>
        <p style="margin: 26px 0 0; max-width: 620px; font-size: 19px; line-height: 1.6; color: #4B5550;">What Edviro is, how it works with what you already have, and how it proves that the work succeeded.</p>
        <p style="margin: 18px 0 0; font-size: 15px; line-height: 1.6; color: #5F6B65;">Looking for something specific? See the detailed questions on
          <RouterLink :to="FACILITIES_OPS_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">school facilities operations</RouterLink>,
          <RouterLink :to="WORK_ORDERS_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">work orders</RouterLink>,
          <RouterLink :to="CMMS_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">CMMS replacement or integration</RouterLink>,
          <RouterLink :to="SCHOOL_ENERGY_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">energy management for schools</RouterLink>,
          <RouterLink :to="MV_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">measurement and verification</RouterLink>, and
          <RouterLink :to="CAPITAL_PLANNING_PATH" class="text-link" style="color: var(--accent); text-decoration: none; font-weight: 500;">capital planning</RouterLink>.
        </p>
      </div>
    </section>

    <FaqList :items="faqs" />

    <CtaSection />
  </main>
</template>

<style scoped>
.text-link:hover {
  text-decoration: underline;
}
</style>
