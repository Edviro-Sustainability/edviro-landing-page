<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import { CALENDLY_URL } from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions/construction' },
  { name: 'Construction', path: '/solutions/construction' },
]

const faqs: FaqItem[] = [
  {
    question: 'What is an energy baseline and why does it matter for construction?',
    answer:
      'A baseline is a measured model of how a building uses energy before and during construction. Edviro sets an independent baseline so that every savings or performance claim after handover can be measured against it, which is what owners and lenders require to trust the numbers.',
  },
  {
    question: 'How does Edviro provide audit-grade measurement and verification (M&V)?',
    answer:
      'Edviro fits a baseline to metered data, then verifies performance against it continuously and generates reports owners and lenders trust. Variances are flagged to the general contractor as they appear rather than discovered after handover.',
  },
  {
    question: 'Does Edviro keep working after the building is handed over?',
    answer:
      'Yes. The same agents that handle baselining and M&V continue to catch faults and waste after handover, so new buildings run as designed from day one.',
  },
  {
    question: 'Can Edviro support performance guarantees and incentives?',
    answer:
      'Edviro produces lender-ready, audit-grade M&V that supports performance guarantees, utility incentives, and green financing, because every claim is tied to measured data against an independent baseline.',
  },
  {
    question: 'How does the as-built digital twin compare to the design model?',
    answer:
      'As metered data comes in, Edviro builds a digital twin of the building as it actually performs and checks it against the design model continuously. Variance surfaces during the build, when it is cheap to correct, instead of after handover, and the owner inherits a calibrated twin for future capital planning.',
  },
]

usePageSeo({
  title: 'Baselining and M&V for construction',
  description:
    'Edviro builds independent baselining and audit-grade measurement and verification (M&V) into the build, so every savings claim holds up for owners and lenders and new buildings run as designed.',
  path: '/solutions/construction',
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro baselining and M&V for construction',
      description:
        'Independent energy baselining and audit-grade measurement and verification for new construction and major retrofits.',
      path: '/solutions/construction',
      serviceType: 'Measurement and verification',
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
        <div style="max-width: 760px;">
          <p style="margin: 0 0 22px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">For construction teams</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 62px); line-height: 1.05; letter-spacing: -0.035em;">Baselining and M&amp;V, <span style="color: var(--accent);">built into the build</span>.</h1>
          <p style="margin: 26px 0 0; max-width: 600px; font-size: 19px; line-height: 1.6; color: #55564C;">Edviro sets an independent energy baseline and runs audit-grade measurement and verification from day one, so every savings claim holds up for owners and lenders.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <a :href="CALENDLY_URL" target="_blank" rel="noopener" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #F4F2EC; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</a>
            <RouterLink to="/measurement-and-verification" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #1A1B14; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #CFCBBD;">Learn about M&amp;V</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- PILLARS -->
    <section style="padding: 30px 32px 60px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 620px;">Savings claims that hold up.</h2>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <div style="border-top: 1.5px solid #1A1B14; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Independent baselining</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">Set a measured energy baseline before and during construction, so every later claim has a reference.</p>
          </div>
          <div style="border-top: 1.5px solid #1A1B14; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Audit-grade M&amp;V</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">Verify performance against the baseline continuously, with reports owners and lenders trust.</p>
          </div>
          <div style="border-top: 1.5px solid #1A1B14; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Agents from day one</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">The same agents that verify also catch faults and waste, so buildings run as designed from handover.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EXAMPLE -->
    <section style="padding: 50px 32px; background: #16170F; color: #F4F2EC;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center;">
        <div>
          <p style="margin: 0 0 18px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8E907F;">In practice</p>
          <h2 style="margin: 0 0 18px; font-weight: 400; font-size: clamp(26px, 3.4vw, 40px); line-height: 1.08; letter-spacing: -0.03em; color: #F8F7F1;">Catch the variance before the owner does.</h2>
          <p style="margin: 0; font-size: 17px; line-height: 1.65; color: #C9CABA;">Edviro locks an independent baseline during fit-out, tracks measured load against the design model, and flags variances to the general contractor in real time, then issues a lender-ready M&amp;V report to the owner.</p>
        </div>
        <div style="background: #1F2017; border: 1px solid #2D2E22; border-radius: 18px; padding: 24px;">
          <div style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #8E907F; margin-bottom: 8px;">BASELINE · Tower A · fit-out</div>
          <div style="font-size: 17px; font-weight: 600; color: #F4F2EC; line-height: 1.35; margin-bottom: 16px;">Independent baseline locked. Measured load tracking 8% above the design model.</div>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 14px; color: #C9CABA;">
            <div>Baseline fit to metered data</div>
            <div>Variance flagged to the GC</div>
            <div style="color: #8E907F;">Issue M&amp;V report to owner</div>
          </div>
          <div style="margin-top: 16px; display: flex; align-items: center; justify-content: space-between; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #8E907F;">
            <span>Verifying against baseline…</span>
            <span style="color: #6FCF97;">lender-ready</span>
          </div>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from builders" heading="Construction FAQ" :items="faqs" />

    <CtaSection />
  </main>
</template>

<style scoped>
.book-btn:hover {
  filter: brightness(1.12);
}
.outline-btn:hover {
  border-color: #1a1b14 !important;
}
</style>
