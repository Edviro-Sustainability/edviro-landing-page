<script setup lang="ts">
import TeamSection from '@/components/TeamSection.vue'
import CtaSection from '@/components/CtaSection.vue'
import PageBreadcrumbs from '@/components/PageBreadcrumbs.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { breadcrumbLd, organizationLd } from '@/seo/jsonld'
import { CONTACT_EMAIL } from '@/seo/site'

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

usePageSeo({
  title: 'About Edviro',
  description:
    'Edviro is a Y Combinator-backed team building autonomous energy management for the built environment, starting hands-on with school facilities and applied AI across climate and beyond.',
  path: '/about',
  type: 'website',
  jsonLd: [organizationLd(), breadcrumbLd(breadcrumbs)],
})
</script>

<template>
  <main>
    <PageBreadcrumbs :items="breadcrumbs" />

    <!-- HERO -->
    <section style="padding: 40px 32px 56px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div style="max-width: 820px;">
          <p style="margin: 0 0 22px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">About Edviro</p>
          <h1 style="margin: 0; font-weight: 400; font-size: clamp(36px, 5.4vw, 62px); line-height: 1.05; letter-spacing: -0.035em;">Making the built environment <span style="color: var(--accent);">run like software</span>.</h1>
          <p style="margin: 26px 0 0; max-width: 640px; font-size: 19px; line-height: 1.6; color: #55564C;">Buildings waste enormous amounts of energy, and the people who run them are handed dashboards instead of answers. Edviro exists to close that gap, turning meters, controls, and utility data into autonomous action that cuts waste and proves the savings.</p>
        </div>
      </div>
    </section>

    <!-- MISSION / APPROACH -->
    <section style="padding: 20px 32px 40px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div class="r-cols-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;">
          <div style="border-top: 1.5px solid #1A1B14; padding-top: 18px;">
            <h2 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Hands-on from the start</h2>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">Edviro began working directly with school facilities teams, learning what they actually need to run buildings well.</p>
          </div>
          <div style="border-top: 1.5px solid #1A1B14; padding-top: 18px;">
            <h2 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Applied AI, in the real world</h2>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">The team has shipped applied AI across climate, healthcare, and aviation, and brings that rigor to building energy.</p>
          </div>
          <div style="border-top: 1.5px solid #1A1B14; padding-top: 18px;">
            <h2 style="margin: 0 0 10px; font-size: 19px; font-weight: 600;">Backed by Y Combinator</h2>
            <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">Edviro is a Y Combinator-backed company building autonomous energy management for the built environment.</p>
          </div>
        </div>
      </div>
    </section>

    <TeamSection />

    <!-- CONTACT -->
    <section style="padding: 10px 32px 90px;">
      <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
        <div style="border: 1px solid #E3E0D5; border-radius: 18px; background: #FBFAF6; padding: 32px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
          <div>
            <h2 style="margin: 0 0 6px; font-size: 20px; font-weight: 600;">Get in touch</h2>
            <p style="margin: 0; font-size: 15.5px; color: #6B6C5E;">Questions, partnerships, or press? We'd love to hear from you.</p>
          </div>
          <a :href="`mailto:${CONTACT_EMAIL}`" class="contact-email" style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: var(--accent); text-decoration: none; border: 1px solid #CFCBBD; padding: 12px 20px; border-radius: 999px;">{{ CONTACT_EMAIL }}</a>
        </div>
      </div>
    </section>

    <CtaSection />
  </main>
</template>

<style scoped>
.contact-email:hover {
  border-color: #1a1b14 !important;
}
</style>
