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
  { name: 'Measurement & Verification', path: '/measurement-and-verification' },
]

const faqs: FaqItem[] = [
  {
    question: 'What is measurement and verification (M&V)?',
    answer:
      'Measurement and verification (M&V) is the process of using metered data to quantify how much energy a building actually saved compared to what it would have used otherwise. It establishes a baseline, measures real consumption after a change, and reports the difference so savings can be trusted rather than estimated.',
  },
  {
    question: 'How is an energy baseline created?',
    answer:
      'Edviro learns a baseline by fitting a model to your historical and live meter data, accounting for drivers like weather, schedules, occupancy, and tariffs. Every action is then measured against this learned baseline, so you can see exactly what changed and what it saved.',
  },
  {
    question: 'What makes M&V "audit-grade" or board-ready?',
    answer:
      'Audit-grade M&V ties every reported saving back to measured data against a documented baseline, with methodology that holds up to outside scrutiny. Edviro generates these reports automatically so facilities leaders can show boards, owners, and lenders proof rather than promises.',
  },
  {
    question: 'How does Edviro know its fixes actually saved energy?',
    answer:
      'After Edviro acts, it checks its own work in the meter data and on the bill. If a change did not produce the expected savings against the baseline, Edviro flags it, so you only count savings that are real.',
  },
]

usePageSeo({
  title: 'Measurement & Verification (M&V)',
  description:
    'Measurement and verification (M&V) explained: how Edviro learns a building energy baseline, measures every action against it, and generates audit-grade, board-ready proof of savings automatically.',
  path: '/measurement-and-verification',
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro measurement and verification (M&V)',
      description:
        'Automated, audit-grade measurement and verification of building energy savings against a learned baseline.',
      path: '/measurement-and-verification',
      serviceType: 'Measurement and verification',
    }),
    faqLd(faqs),
  ],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <!-- HERO -->
    <section style="padding: 40px 32px 56px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div style="max-width: 820px;">
          <p style="margin: 0 0 22px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">Measurement &amp; verification</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 62px); line-height: 1.05; letter-spacing: -0.035em;">Proof your board can read.</h1>
          <p style="margin: 26px 0 0; max-width: 640px; font-size: 19px; line-height: 1.6; color: #55564C;">Every action Edviro takes is measured against a learned baseline, so you can show exactly what changed, what it saved, and that it is still saving. Board-ready, audit-grade, generated automatically.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <a :href="CALENDLY_URL" target="_blank" rel="noopener" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #F4F2EC; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</a>
          </div>
        </div>
      </div>
    </section>

    <!-- DEFINITION -->
    <section style="padding: 20px 32px 60px;">
      <div style="max-width: 820px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 16px; font-weight: 400; font-size: clamp(26px, 3.4vw, 38px); line-height: 1.1; letter-spacing: -0.025em;">What is measurement and verification?</h2>
        <p style="margin: 0 0 16px; font-size: 17px; line-height: 1.7; color: #55564C;">Measurement and verification (M&amp;V) is how you prove energy savings with data instead of estimates. It works in three steps: establish a baseline of how a building would have used energy, measure what it actually uses after a change, and report the difference. Done well, M&amp;V turns "we think we saved" into "here is exactly what we saved, and here is the proof."</p>
        <p style="margin: 0; font-size: 17px; line-height: 1.7; color: #55564C;">Traditional M&amp;V is slow and manual, done once per project by a consultant. Edviro makes it continuous: every fix is verified against a live baseline the moment it lands, and the reporting is generated for you.</p>
      </div>
    </section>

    <!-- HOW EDVIRO DOES IT -->
    <section style="padding: 50px 32px; background: #16170F; color: #F4F2EC;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <p style="margin: 0 0 18px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8E907F;">How Edviro verifies</p>
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.8vw, 44px); line-height: 1.06; letter-spacing: -0.03em; color: #F8F7F1; max-width: 640px;">A baseline that learns, and proof that updates itself.</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #2D2E22; border: 1px solid #2D2E22; border-radius: 16px; overflow: hidden;">
          <div style="background: #1F2017; padding: 28px;">
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #6FCF97; margin-bottom: 14px;">01 / Baseline</div>
            <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: #F4F2EC;">Learn the building</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #C9CABA;">Fit a model to meter data, weather, schedules, and tariffs to predict normal usage.</p>
          </div>
          <div style="background: #1F2017; padding: 28px;">
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #6FCF97; margin-bottom: 14px;">02 / Measure</div>
            <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: #F4F2EC;">Compare to actual</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #C9CABA;">Track real consumption against the predicted baseline, continuously and per site.</p>
          </div>
          <div style="background: #1F2017; padding: 28px;">
            <div style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #6FCF97; margin-bottom: 14px;">03 / Report</div>
            <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600; color: #F4F2EC;">Prove the savings</h3>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6; color: #C9CABA;">Generate board-ready, audit-grade reports that show what changed and what it saved.</p>
          </div>
        </div>
        <div style="margin-top: 28px; display: inline-flex; align-items: baseline; gap: 12px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #8E907F;">
          <span style="color: #6FCF97; font-size: 15px;">−21.4%</span> verified vs baseline at a live high-school site
        </div>
      </div>
    </section>

    <!-- WHO USES IT -->
    <section style="padding: 56px 32px 20px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 28px; font-weight: 400; font-size: clamp(26px, 3.4vw, 38px); line-height: 1.1; letter-spacing: -0.025em;">Where M&amp;V matters most</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <RouterLink to="/solutions/schools" class="card-link" style="text-decoration: none; color: inherit; border: 1px solid #E3E0D5; border-radius: 16px; padding: 24px; background: #FBFAF6; display: block;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 6px;">Schools &rarr;</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">Show the board verified savings across every site, not quarterly estimates.</p>
          </RouterLink>
          <RouterLink to="/solutions/real-estate" class="card-link" style="text-decoration: none; color: inherit; border: 1px solid #E3E0D5; border-radius: 16px; padding: 24px; background: #FBFAF6; display: block;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 6px;">Real estate &rarr;</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">Prove avoided demand charges and energy cuts to owners and tenants.</p>
          </RouterLink>
          <RouterLink to="/solutions/construction" class="card-link" style="text-decoration: none; color: inherit; border: 1px solid #E3E0D5; border-radius: 16px; padding: 24px; background: #FBFAF6; display: block;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 6px;">Construction &rarr;</div>
            <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #6B6C5E;">Lender-ready verification against an independent baseline from day one.</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <FaqList eyebrow="M&V questions" heading="Frequently asked" :items="faqs" />

    <CtaSection />
  </main>
</template>

<style scoped>
.book-btn:hover {
  filter: brightness(1.12);
}
.card-link:hover {
  border-color: #1a1b14 !important;
}
</style>
