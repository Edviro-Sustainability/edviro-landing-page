<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import FaqList from '@/components/FaqList.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, faqLd, serviceLd, organizationLd, type FaqItem } from '@/seo/jsonld'
import { BOOK_DEMO_PATH } from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Solutions', path: '/solutions/data-centers/' },
  { name: 'Data centers', path: '/solutions/data-centers/' },
]

const faqs: FaqItem[] = [
  {
    question: 'What data does Edviro need from a data center?',
    answer:
      'The telemetry already coming out of the site: power at the rack, pod, and site level, cooling plant data, supply and return temperatures, and environmental sensors. Nothing new to install for a pilot.',
  },
  {
    question: 'How is this different from a one-time CFD study?',
    answer:
      'A study answers a design question and then goes stale as the floor changes. Edviro keeps a physics-based model continuously calibrated to measured telemetry, so headroom answers stay current as load and layout change.',
  },
  {
    question: 'What does the pilot look like?',
    answer:
      'One live pod: Edviro calibrates the thermal model to the pod\u2019s telemetry, simulates a density scenario, and verifies predictions against measured data. A short pilot outline is available on request.',
  },
  {
    question: 'Does Edviro control the cooling plant?',
    answer:
      'No. Edviro models and simulates; any change to the floor or the cooling plant stays with your team and your vendors.',
  },
  {
    question: 'What question does it answer?',
    answer:
      'How much additional rack capacity the site can support before cooling becomes the constraint, on the infrastructure you already have.',
  },
]

usePageSeo({
  title: 'Thermal headroom modeling for data centers',
  description:
    'Edviro builds a physics-based thermal model of your data center from the telemetry already coming out of the site, quantifies cooling headroom at higher rack densities, and verifies predictions on a live pod.',
  path: '/solutions/data-centers/',
  jsonLd: [
    organizationLd(),
    breadcrumbLd(breadcrumbs),
    serviceLd({
      name: 'Edviro thermal headroom modeling for data centers',
      description:
        'Physics-based thermal modeling, cooling headroom quantification, and density simulation for data centers, verified against measured telemetry.',
      path: '/solutions/data-centers/',
      serviceType: 'Thermal capacity modeling',
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
          <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">For data center operators</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 62px); line-height: 1.05; letter-spacing: -0.035em;">Thermal headroom, modeled <span style="color: var(--accent);">from the data you already have</span>.</h1>
          <p style="margin: 26px 0 0; max-width: 600px; font-size: 19px; line-height: 1.6; color: #4B5550;">Edviro builds a physics-based thermal model of your site from the telemetry already coming out of it, answers how much more rack capacity a pod can take before cooling becomes the constraint, and verifies its predictions on a live pod.</p>
          <div style="margin-top: 32px; display: flex; gap: 14px; flex-wrap: wrap;">
            <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</RouterLink>
            <RouterLink to="/capital-planning/" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #171D1A; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #C0CCC3;">See decision simulation</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- PILLARS -->
    <section style="padding: 30px 32px 60px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <h2 style="margin: 0 0 40px; font-weight: 400; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.08; letter-spacing: -0.03em; max-width: 620px;">From telemetry to headroom.</h2>
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">A thermal model of your site</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">Trained on power, cooling, and environmental telemetry the site already exports. No new instrumentation.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Headroom, quantified</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">How much cooling headroom exists at today's load, and where it runs out as rack density rises.</p>
          </div>
          <div style="border-top: 1.5px solid #171D1A; padding-top: 18px;">
            <h3 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Simulate before you commit</h3>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #5F6B65;">Density scenarios and cooling configurations tested against the model, not the live floor.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EXAMPLE -->
    <section style="padding: 50px 32px; background: #101815; color: #EDF0EE;">
      <div class="r-split" style="max-width: 1180px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center;">
        <div>
          <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #79867E;">In practice</p>
          <h2 style="margin: 0 0 18px; font-weight: 400; font-size: clamp(26px, 3.4vw, 40px); line-height: 1.08; letter-spacing: -0.03em; color: #F2F5F1;">One pod, measured proof.</h2>
          <p style="margin: 0; font-size: 17px; line-height: 1.65; color: #C4CBC5;">Edviro calibrates the thermal model on a live pod's telemetry, simulates a density step, and verifies predicted against measured inlet temperatures, so you know how far the model can be trusted before you plan capacity with it.</p>
        </div>
        <div style="background: #17201B; border: 1px solid #26302A; border-radius: 18px; padding: 24px;">
          <div style="font-weight: 600; font-size: 11px; color: #79867E; margin-bottom: 8px;">HEADROOM · Pod 3 · N+1 cooling</div>
          <div style="font-size: 17px; font-weight: 600; color: #EDF0EE; line-height: 1.35; margin-bottom: 16px;">Cooling headroom 240 kW at design inlet. Supports +12 racks at 17 kW before ΔT becomes the constraint.</div>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 14px; color: #C4CBC5;">
            <div>Thermal model calibrated to site telemetry</div>
            <div>Density scenario simulated at N+1</div>
            <div style="color: #79867E;">Verify against measured inlet temps</div>
          </div>
          <div style="margin-top: 16px; display: flex; align-items: center; justify-content: space-between; font-weight: 500; font-size: 11px; color: #79867E;">
            <span>Verifying against live telemetry…</span>
            <span style="color: #6FCF97;">pilot: one live pod</span>
          </div>
        </div>
      </div>
    </section>

    <FaqList eyebrow="Questions from operators" heading="Data center FAQ" :items="faqs" />

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
</style>
