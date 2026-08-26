<script setup lang="ts">
import FaqList from '@/components/FaqList.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, serviceLd, type FaqItem } from '@/seo/jsonld'
import { BOOK_DEMO_PATH, DEMO_CLICK_OPENAI_EVENT, DEMO_REDIRECT_PATH } from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Demo & pricing', path: BOOK_DEMO_PATH },
]

const steps = [
  {
    num: '01',
    title: 'A 30-minute demo',
    body: 'We walk you through Edviro end to end: how it reads your bills and interval data, what it flags, and what it hands your team to fix. You talk to the founders, not an SDR.',
  },
  {
    num: '02',
    title: 'A quote for your sites',
    body: 'We talk through which sites, which systems, and where you already suspect money is going, then quote based on exactly what your school needs.',
  },
  {
    num: '03',
    title: 'Data, then your initial report',
    body: 'Once you are set up we gather your bills and meter data, get Edviro reading your sites, and come back with an initial report on what it found.',
  },
]

const faqs: FaqItem[] = [
  {
    question: 'What actually happens on the demo call?',
    answer:
      'Thirty minutes with the founders. We walk you through Edviro — how it reads bills and interval data, what it flags, and what it hands your team to fix — then talk through your portfolio so we can scope a quote.',
  },
  {
    question: 'Who should be on the call?',
    answer:
      'Usually a director of maintenance, operations, facilities, sustainability, business, or finance. Anyone is welcome, and it helps to have someone who knows the buildings alongside someone who knows the budget.',
  },
  {
    question: 'How much does Edviro cost?',
    answer:
      'Pricing depends on your portfolio, how many sites you connect, and how much of Edviro you turn on. We scope it on the call and quote based on exactly what you need.',
  },
  {
    question: 'Do we have to buy all of it at once?',
    answer:
      'No. You start where the pain is and add the rest when the last step has paid for itself. Nothing is bundled, and there is no module you have to buy to unlock the one you wanted.',
  },
  {
    question: 'Do we need new hardware or a new building management system?',
    answer:
      'No. Edviro is software that sits on top of what you already have. It connects to your meters, building management system, sensors, and utility data without ripping anything out.',
  },
  {
    question: 'Can we start with a single site?',
    answer:
      'Yes. Most teams connect a few sites, see what Edviro finds in the first week, then expand. To date Edviro has saved clients over $400K, with 34 school sites live and expanding.',
  },
]

usePageSeo({
  title: 'Demo & pricing',
  description:
    'Book a 30-minute Edviro demo with the founders, see how it catches energy waste across your sites, and get a quote scoped to exactly what your school needs.',
  path: BOOK_DEMO_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro demo and pricing',
      description:
        'A 30-minute product demo with the founders, a scoping conversation about your portfolio, and a quote priced per connected site.',
      path: BOOK_DEMO_PATH,
      areaServed: 'United States',
    }),
    faqLd(faqs),
  ],
})

/**
 * Reports opening the scheduler as demand for contact, not as a booking — the
 * confirmed booking is reported from /demo-booked when Calendly redirects back.
 * Only OpenAI Ads gets this softer signal, because its taxonomy has a separate
 * standard event for it; the Google and LinkedIn conversions would need second
 * conversion actions created in their dashboards to be told apart from a booking.
 * The pixel loads from index.html.
 */
function reportDemoIntent(): void {
  window.oaiq?.('measure', DEMO_CLICK_OPENAI_EVENT, { type: 'customer_action' })
}
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <!-- HERO -->
    <section style="padding: 40px 32px 64px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div style="max-width: 780px;">
          <p style="margin: 0 0 22px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">Demo &amp; pricing</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 62px); line-height: 1.05; letter-spacing: -0.035em;">See Edviro run, then get a quote for <span style="color: var(--accent);">your sites</span>.</h1>
          <p style="margin: 26px 0 0; max-width: 620px; font-size: 19px; line-height: 1.6; color: #55564C;">Thirty minutes with the founders: a walkthrough of the product, a conversation about your portfolio, and a quote scoped to exactly what you need.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <a :href="DEMO_REDIRECT_PATH" target="_blank" rel="noopener" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #F4F2EC; background: var(--accent); padding: 13px 26px; border-radius: 999px;" @click="reportDemoIntent">Book a 30-minute demo</a>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT THE DEMO IS -->
    <section style="padding: 30px 32px 60px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 640px;">How it goes, from the call to your first report.</h2>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <div v-for="step in steps" :key="step.num" style="border-top: 1.5px solid #1A1B14; padding-top: 18px;">
            <p style="margin: 0 0 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.16em; color: #8A8A7C;">{{ step.num }}</p>
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">{{ step.title }}</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">{{ step.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ONE-OFF AUDIT VS CONTINUOUS -->
    <section style="padding: 20px 32px 70px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div class="r-split" style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start;">
          <div style="border: 1px solid #E3E0D5; border-radius: 16px; padding: 28px;">
            <p style="margin: 0 0 14px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #8A8A7C;">The usual energy audit</p>
            <p style="margin: 0; font-size: 16.5px; line-height: 1.62; color: #55564C;">An engineer walks the building for a week, hands over a PDF of recommendations, and invoices. The findings start going stale the day schedules change, and nobody verifies the fixes that did get made.</p>
          </div>
          <div style="border: 1.5px solid #1A1B14; border-radius: 16px; padding: 28px; background: #EFEDE4;">
            <p style="margin: 0 0 14px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent);">With Edviro</p>
            <p style="margin: 0; font-size: 16.5px; line-height: 1.62; color: #1A1B14;">The audit never stops. Edviro re-reads every bill and every interval, catches drift the week it starts, hands your team the fix, and confirms the savings in the meter data.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT THE DEMO COVERS -->
    <section style="padding: 60px 32px; background: #16170F; color: #F4F2EC;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8E907F;">On the call</p>
        <h2 style="margin: 0 0 36px; font-weight: 400; font-size: clamp(28px, 3.8vw, 44px); line-height: 1.06; letter-spacing: -0.03em; color: #F8F7F1; max-width: 700px;">The kinds of waste we will show you Edviro catching.</h2>
        <div class="r-split" style="display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 40px; align-items: start;">
          <div>
            <h3 style="margin: 0 0 14px; font-size: 18px; font-weight: 600; color: #F4F2EC;">Nothing to prepare</h3>
            <p style="margin: 0 0 18px; font-size: 16px; line-height: 1.62; color: #C9CABA;">No data pull, no install, and no access to your control system to sit through a demo. Bring the buildings you are worried about and whatever questions your team has.</p>
            <a :href="DEMO_REDIRECT_PATH" target="_blank" rel="noopener" class="audit-btn" style="display: inline-block; font-size: 15px; font-weight: 500; text-decoration: none; color: #16170F; background: #F4F2EC; padding: 13px 26px; border-radius: 999px;" @click="reportDemoIntent">Book a 30-minute demo</a>
          </div>
          <div>
            <h3 style="margin: 0 0 14px; font-size: 18px; font-weight: 600; color: #F4F2EC;">What you will see</h3>
            <ul style="margin: 0; padding: 0; list-style: none; display: grid; gap: 1px; background: #2D2E22; border: 1px solid #2D2E22; border-radius: 16px; overflow: hidden;">
              <li style="background: #1F2017; padding: 20px 24px; font-size: 15.5px; line-height: 1.6; color: #C9CABA;">Where usage stops lining up with how a building is actually used, at night, on weekends, and over breaks.</li>
              <li style="background: #1F2017; padding: 20px 24px; font-size: 15.5px; line-height: 1.6; color: #C9CABA;">What demand charges cost, and how much of that is spikes that could be shifted.</li>
              <li style="background: #1F2017; padding: 20px 24px; font-size: 15.5px; line-height: 1.6; color: #C9CABA;">Billing and tariff problems: misapplied line items, and load that belongs on a different rate schedule.</li>
              <li style="background: #1F2017; padding: 20px 24px; font-size: 15.5px; line-height: 1.6; color: #C9CABA;">How fixes get ranked by what pays back first, and how the savings are verified afterwards.</li>
            </ul>
            <p style="margin: 18px 0 0; font-size: 15px; line-height: 1.6; color: #8E907F;">Then we scope your sites and quote from there.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section style="padding: 70px 32px 40px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">Pricing</p>
        <h2 style="margin: 0 0 20px; font-weight: 400; font-size: clamp(28px, 3.8vw, 44px); line-height: 1.06; letter-spacing: -0.03em; max-width: 640px;">Pay for the part you are actually using.</h2>
        <p style="margin: 0 0 20px; max-width: 660px; font-size: 17.5px; line-height: 1.62; color: #55564C;">Edviro is quoted per connected site and scoped to what you actually turn on, so a team that wants to see where money is leaking is not paying for capital planning. Start where the pain is and expand when the last step has paid for itself.</p>
        <p style="margin: 0; max-width: 660px; font-size: 17.5px; line-height: 1.62; color: #55564C;">We work out the number on the call, once we know your portfolio and which sites you want connected.</p>
      </div>
    </section>

    <!-- NO MODULE HELL -->
    <section style="padding: 20px 32px 90px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div style="border: 1px solid #E3E0D5; border-radius: 16px; padding: 34px;">
          <div class="r-split" style="display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 32px; align-items: start;">
            <div>
              <h3 style="margin: 0 0 12px; font-size: 22px; font-weight: 600; letter-spacing: -0.01em;">What you will not get</h3>
              <p style="margin: 0; font-size: 16px; line-height: 1.62; color: #6B6C5E;">Energy software has a habit of selling you a catalog and letting you sort out which half you needed.</p>
            </div>
            <div class="r-cols-2" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px;">
              <div>
                <h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">No module maze</h4>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">Nothing is bundled, and no module exists only to unlock the one you wanted.</p>
              </div>
              <div>
                <h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">No per-seat counting</h4>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">Pricing follows sites, not headcount, so adding a maintenance tech costs nothing.</p>
              </div>
              <div>
                <h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">No install project first</h4>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">No hardware order and no rip-and-replace before you see a single finding.</p>
              </div>
              <div>
                <h4 style="margin: 0 0 8px; font-size: 16px; font-weight: 600;">No unverifiable savings</h4>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">Everything reports against a learned baseline, so the savings show up on the bill.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Before you book" heading="Demo and pricing FAQ" :items="faqs" />

    <!-- CTA -->
    <section style="padding: 100px 32px; background: var(--accent); color: #F4F2EC;">
      <div style="max-width: 820px; margin: 0 auto; width: 100%; text-align: center;">
        <h2 style="margin: 0; font-weight: 400; font-size: clamp(34px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.035em; color: #F8F7F1;">Book the thirty minutes.</h2>
        <p style="margin: 24px auto 0; max-width: 560px; font-size: 18px; line-height: 1.6; color: rgba(244,242,236,0.78);">We will walk you through Edviro, talk through your sites, and tell you what it would cost. Bring whoever should hear it.</p>
        <div style="margin-top: 34px; display: flex; justify-content: center;">
          <a :href="DEMO_REDIRECT_PATH" target="_blank" rel="noopener" class="cta-btn" style="font-size: 16px; font-weight: 600; text-decoration: none; color: var(--accent); background: #F4F2EC; padding: 15px 34px; border-radius: 999px;" @click="reportDemoIntent">Pick a time</a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.book-btn:hover,
.audit-btn:hover {
  filter: brightness(1.12);
}
.cta-btn:hover {
  filter: brightness(1.06);
}
</style>
