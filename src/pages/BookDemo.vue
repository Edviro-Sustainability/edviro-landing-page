<script setup lang="ts">
import { onMounted } from 'vue'
import FaqList from '@/components/FaqList.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, organizationLd, serviceLd, type FaqItem } from '@/seo/jsonld'
import {
  BOOK_DEMO_CONVERSION,
  BOOK_DEMO_PATH,
  CONTACT_EMAIL,
  DEMO_REDIRECT_PATH,
} from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Demo, audit & pricing', path: BOOK_DEMO_PATH },
]

const auditMailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Free bill audit')}`

const steps = [
  {
    num: '01',
    title: 'A 30-minute consultation',
    body: "We go through your portfolio, your tariffs, the systems you run, and where you already suspect money is leaking. You talk to the founders, not an SDR.",
  },
  {
    num: '02',
    title: 'We connect a few of your sites',
    body: 'Utility bills and interval meter data to start, your building management system if you want to go further. No new hardware and no rip-and-replace.',
  },
  {
    num: '03',
    title: 'You see what it caught',
    body: "In the first week we walk you through the waste Edviro found in your own buildings, what it's worth a year, and which fixes we would run first.",
  },
]

const faqs: FaqItem[] = [
  {
    question: 'What actually happens on the demo call?',
    answer:
      'Thirty minutes with the founders, run against your data rather than a slide deck. We go through your portfolio, your tariffs, and the systems you run, then connect a few of your sites and show you what Edviro catches in the first week.',
  },
  {
    question: 'Is the bill audit really free?',
    answer:
      'Yes. Send twelve months of utility bills, or set up a utility data-sharing connection, and we hand back an estimate of what is recoverable and which fixes pay back first. There is no software to install, no access to your control system, and no commitment.',
  },
  {
    question: 'How much does Edviro cost?',
    answer:
      'Pricing depends on your portfolio, how many sites you connect, and how much of Edviro you turn on. The free bill audit comes first, so by the time we quote you can see the recoverable spend sitting next to the price.',
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
      'Yes. Most teams connect a few sites, see what Edviro finds in the first week, then expand. To date Edviro has saved clients over $400K, with 7 school sites live and 29 more expanding.',
  },
]

usePageSeo({
  title: 'Demo, free bill audit & pricing',
  description:
    'Book a 30-minute Edviro demo on your own data, get a free audit of your last 12 months of utility bills, and see how pricing works if you want to start small.',
  path: BOOK_DEMO_PATH,
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro demo, free utility bill audit, and pricing',
      description:
        'A 30-minute consultation on your own portfolio, a free estimate of recoverable spend read from twelve months of utility bills, and pricing quoted per connected site.',
      path: BOOK_DEMO_PATH,
      areaServed: 'United States',
    }),
    faqLd(faqs),
  ],
})

onMounted(() => {
  // Reaching this page is the Google Ads conversion: it is only linked from
  // "Book a demo" CTAs. Firing here rather than on the /demo redirect gives the
  // beacon time to leave the browser. window.gtag comes from index.html.
  window.gtag?.('event', 'conversion', { send_to: BOOK_DEMO_CONVERSION })
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <!-- HERO -->
    <section style="padding: 40px 32px 64px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div style="max-width: 780px;">
          <p style="margin: 0 0 22px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">Demo, free audit &amp; pricing</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 62px); line-height: 1.05; letter-spacing: -0.035em;">See what we would find in your buildings <span style="color: var(--accent);">before you pay us anything</span>.</h1>
          <p style="margin: 26px 0 0; max-width: 620px; font-size: 19px; line-height: 1.6; color: #55564C;">A 30-minute consultation on your own portfolio, a free read of your last twelve months of utility bills, and pricing you can start small on.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <a :href="DEMO_REDIRECT_PATH" target="_blank" rel="noopener" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #F4F2EC; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a 30-minute demo</a>
            <a :href="auditMailto" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #1A1B14; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #CFCBBD;">Get the free bill audit</a>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT THE DEMO IS -->
    <section style="padding: 30px 32px 60px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 640px;">The demo runs on your data, not a slide deck.</h2>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <div v-for="step in steps" :key="step.num" style="border-top: 1.5px solid #1A1B14; padding-top: 18px;">
            <p style="margin: 0 0 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.16em; color: #8A8A7C;">{{ step.num }}</p>
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">{{ step.title }}</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">{{ step.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CONSULTATION THAT KEEPS GOING -->
    <section style="padding: 20px 32px 70px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div class="r-split" style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start;">
          <div style="border: 1px solid #E3E0D5; border-radius: 16px; padding: 28px;">
            <p style="margin: 0 0 14px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: #8A8A7C;">The usual consultation</p>
            <p style="margin: 0; font-size: 16.5px; line-height: 1.62; color: #55564C;">An engineer walks the building for a week, hands over a PDF of recommendations, and invoices. The findings start going stale the day schedules change, and nobody verifies the fixes that did get made.</p>
          </div>
          <div style="border: 1.5px solid #1A1B14; border-radius: 16px; padding: 28px; background: #EFEDE4;">
            <p style="margin: 0 0 14px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent);">Consulting with Edviro</p>
            <p style="margin: 0; font-size: 16.5px; line-height: 1.62; color: #1A1B14;">The audit never stops. Edviro re-reads every bill and every interval, catches drift the week it starts, hands your team the fix, and confirms the savings in the meter data. You get the engineering judgment on the call and the monitoring in between.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FREE BILL AUDIT -->
    <section style="padding: 60px 32px; background: #16170F; color: #F4F2EC;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8E907F;">Free bill audit</p>
        <h2 style="margin: 0 0 36px; font-weight: 400; font-size: clamp(28px, 3.8vw, 44px); line-height: 1.06; letter-spacing: -0.03em; color: #F8F7F1; max-width: 700px;">Send us twelve months of bills. We will tell you what is recoverable.</h2>
        <div class="r-split" style="display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 40px; align-items: start;">
          <div>
            <h3 style="margin: 0 0 14px; font-size: 18px; font-weight: 600; color: #F4F2EC;">What you send</h3>
            <p style="margin: 0 0 18px; font-size: 16px; line-height: 1.62; color: #C9CABA;">Twelve months of utility bills as PDFs, or a utility data-sharing connection such as PG&amp;E Share My Data. That is the whole ask. Nothing to install, and no access to your control system.</p>
            <a :href="auditMailto" class="audit-btn" style="display: inline-block; font-size: 15px; font-weight: 500; text-decoration: none; color: #16170F; background: #F4F2EC; padding: 13px 26px; border-radius: 999px;">Email us your bills</a>
          </div>
          <div>
            <h3 style="margin: 0 0 14px; font-size: 18px; font-weight: 600; color: #F4F2EC;">What you get back</h3>
            <ul style="margin: 0; padding: 0; list-style: none; display: grid; gap: 1px; background: #2D2E22; border: 1px solid #2D2E22; border-radius: 16px; overflow: hidden;">
              <li style="background: #1F2017; padding: 20px 24px; font-size: 15.5px; line-height: 1.6; color: #C9CABA;">Where usage stops lining up with how the building is actually used, at night, on weekends, and over breaks.</li>
              <li style="background: #1F2017; padding: 20px 24px; font-size: 15.5px; line-height: 1.6; color: #C9CABA;">What demand charges are costing you, and how much of that is spikes you could shift.</li>
              <li style="background: #1F2017; padding: 20px 24px; font-size: 15.5px; line-height: 1.6; color: #C9CABA;">Billing and tariff problems: misapplied line items, and whether your load belongs on a different rate schedule.</li>
              <li style="background: #1F2017; padding: 20px 24px; font-size: 15.5px; line-height: 1.6; color: #C9CABA;">An estimate of annual recoverable spend, with the fixes ranked by what pays back first.</li>
            </ul>
            <p style="margin: 18px 0 0; font-size: 15px; line-height: 1.6; color: #8E907F;">It costs nothing and it is yours to keep, whether or not you buy anything.</p>
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
        <p style="margin: 0; max-width: 660px; font-size: 17.5px; line-height: 1.62; color: #55564C;">We work out the number on the call, once we know your portfolio and which sites you want connected. The free bill audit comes first, so you see the recoverable spend before you see a price.</p>
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
        <p style="margin: 24px auto 0; max-width: 560px; font-size: 18px; line-height: 1.6; color: rgba(244,242,236,0.78);">Bring a utility bill. We will show you what Edviro finds in your own buildings, and what it costs to keep finding it.</p>
        <div style="margin-top: 34px; display: flex; flex-direction: column; align-items: center; gap: 14px;">
          <a :href="DEMO_REDIRECT_PATH" target="_blank" rel="noopener" class="cta-btn" style="font-size: 16px; font-weight: 600; text-decoration: none; color: var(--accent); background: #F4F2EC; padding: 15px 34px; border-radius: 999px;">Pick a time</a>
          <a :href="auditMailto" class="cta-email" style="font-family: 'IBM Plex Mono', monospace; font-size: 13px; letter-spacing: 0.04em; color: rgba(244,242,236,0.7); text-decoration: none;">{{ CONTACT_EMAIL }}</a>
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
.outline-btn:hover {
  border-color: #1a1b14 !important;
}
.cta-btn:hover {
  filter: brightness(1.06);
}
.cta-email:hover {
  color: #f4f2ec !important;
}
</style>
