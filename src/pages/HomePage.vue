<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import TheLoop from '@/components/TheLoop.vue'
import WhoItsFor from '@/components/WhoItsFor.vue'
import VisibilityMV from '@/components/VisibilityMV.vue'
import ResultsSection from '@/components/ResultsSection.vue'
import TeamSection from '@/components/TeamSection.vue'
import CtaSection from '@/components/CtaSection.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { organizationLd, websiteLd, softwareApplicationLd } from '@/seo/jsonld'

const demoSpeed = 1
const showProofMetrics = true

usePageSeo({
  title: 'Edviro — Autonomous building energy management',
  titleTemplate: null,
  description:
    'Edviro connects your meters, controls, and utility data, watches every building 24/7, catches energy waste as it starts, fixes it, and proves the savings. Backed by Y Combinator.',
  path: '/',
  jsonLd: [organizationLd(), websiteLd(), softwareApplicationLd()],
})
</script>

<template>
  <main>
    <HeroSection :demo-speed="demoSpeed" />
    <TheLoop />
    <WhoItsFor />
    <VisibilityMV />
    <ResultsSection v-if="showProofMetrics" />
    <TeamSection />
    <CtaSection />
  </main>
</template>
