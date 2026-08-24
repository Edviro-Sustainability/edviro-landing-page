<script setup lang="ts">
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, type FaqItem } from '@/seo/jsonld'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'FAQ', path: '/faq' },
]

const faqs: FaqItem[] = [
  {
    question: 'What is Edviro?',
    answer:
      'Edviro brings AI into building operations. It pulls together the data scattered across your bills, meters, BMS, work orders, and sensors, catches energy waste as it starts, fixes it, and proves the savings with audit-grade measurement and verification. All of that data compounds into a digital twin of each building, used for capital planning and intervention simulation. Edviro is backed by Y Combinator.',
  },
  {
    question: 'What is autonomous building energy management?',
    answer:
      'Autonomous building energy management is software that does more than show a dashboard. It continuously monitors a building, detects waste and faults in real time, takes or recommends corrective action, and verifies the result in the meter data, closing the loop without waiting for a person to investigate.',
  },
  {
    question: 'How is Edviro different from utility tracking, monitoring software, or a BMS dashboard?',
    answer:
      'Utility tracking and monitoring tools stop at charts: they show you the waste, and the fixing stays on your plate. Edviro is the execution layer on top of that data. It detects the problem, raises the work order or adjusts the setpoints and schedules itself, and then verifies the result in the meter data. It works on top of your existing BMS rather than replacing it.',
  },
  {
    question: 'Do I need to replace my existing equipment or controls?',
    answer:
      'No. Edviro connects to what you already have, including meters, BMS, submeters, sensors, work orders, and utility bills. There is nothing to rip out, which makes it fast to deploy across many sites.',
  },
  {
    question: 'How does Edviro detect energy waste?',
    answer:
      'Edviro builds a live model of each building and learns its normal load, schedules, and equipment behavior. It then flags drift, anomalies, and waste, such as short-cycling boilers, off-hours runtime, stuck dampers, or creeping overnight base load, the moment they appear.',
  },
  {
    question: 'Does Edviro take action on its own?',
    answer:
      'Edviro can both recommend and act. It raises step-by-step work orders that guide your team in the app, and it can adjust setpoints and schedules autonomously after testing each change first. You stay in control of how much it does automatically.',
  },
  {
    question: 'How does Edviro prove the savings are real?',
    answer:
      'Every change is measured against a learned baseline and confirmed in the meter data and on the bill. Edviro generates board-ready, audit-grade measurement and verification (M&V) automatically, and flags any change that did not save as expected.',
  },
  {
    question: 'What is the digital twin, and what is it for?',
    answer:
      'Everything Edviro ingests and every fix it verifies builds a living model of each building, a digital twin. You can run interventions against it before spending money: replace a boiler versus keep tuning it, add a wing, change a schedule, or absorb a rate change. Each simulation returns projected savings and payback from your real usage.',
  },
  {
    question: 'How does Edviro help with capital planning?',
    answer:
      'Instead of ranking capital projects by equipment age or gut feel, Edviro simulates each candidate project against the digital twin and ranks them by modeled payback. When budget or bond season comes, you bring the board a prioritized list with the data behind it, and verified results on projects already funded.',
  },
  {
    question: 'Who is Edviro for?',
    answer:
      'Edviro is built for the people who run buildings: school facilities teams and K-12 districts, construction teams that need independent baselining and M&V for new builds, and data center operators who need to know how much cooling headroom a site actually has.',
  },
  {
    question: 'How does occupancy-based control work?',
    answer:
      'In commercial buildings, Edviro reads occupancy from the WiFi routers already on each floor and ties HVAC and lighting to who is actually present, so you only condition space that is in use. No new sensors are required.',
  },
  {
    question: 'How quickly can we get started and see results?',
    answer:
      'Edviro typically connects a few of your sites and shows what it catches within the first week, with no upfront audit and no rip-and-replace. To date Edviro has saved clients over $400K, with 7 school sites live and 29 more expanding.',
  },
  {
    question: 'How much does Edviro cost?',
    answer:
      'Pricing depends on your portfolio and how many sites you connect. The fastest way to get a tailored answer is to book a demo, where Edviro will connect a few of your buildings and show the savings it finds.',
  },
]

usePageSeo({
  title: 'Edviro FAQ',
  description:
    'Answers to common questions about Edviro: what autonomous building energy management is, how it works with your existing BMS, how it detects and fixes waste, and how it proves savings with M&V.',
  path: '/faq',
  jsonLd: [organizationLd(), breadcrumbLd(breadcrumbs), faqLd(faqs)],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <!-- HERO -->
    <section style="padding: 40px 32px 24px;">
      <div style="max-width: 820px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 22px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">Frequently asked questions</p>
        <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 60px); line-height: 1.05; letter-spacing: -0.035em;">Edviro, answered.</h1>
        <p style="margin: 26px 0 0; max-width: 620px; font-size: 19px; line-height: 1.6; color: #55564C;">What Edviro is, how it works with what you already have, and how it proves the savings.</p>
      </div>
    </section>

    <FaqList :items="faqs" />

    <CtaSection />
  </main>
</template>
