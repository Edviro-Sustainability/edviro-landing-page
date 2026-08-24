<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import TheLoop from '@/components/TheLoop.vue'
import DigitalTwinSection from '@/components/DigitalTwinSection.vue'
import WhoItsFor from '@/components/WhoItsFor.vue'
import VisibilityMV from '@/components/VisibilityMV.vue'
import ResultsSection from '@/components/ResultsSection.vue'
import TeamSection from '@/components/TeamSection.vue'
import CtaSection from '@/components/CtaSection.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { organizationLd, websiteLd, softwareApplicationLd } from '@/seo/jsonld'

// 0.5 = half speed; the hero demo's step timers scale as 560ms / demoSpeed.
// Slowed from 1 because the card copy was unreadable at full pace.
const demoSpeed = 0.5
const showProofMetrics = true

usePageSeo({
  title: 'Edviro — AI for building operations',
  titleTemplate: null,
  description:
    'Edviro puts AI across your fragmented building data — bills, meters, BMS, and work orders — then catches waste, fixes it, proves the savings, and builds a digital twin for capital planning. Backed by Y Combinator.',
  path: '/',
  jsonLd: [organizationLd(), websiteLd(), softwareApplicationLd()],
})
</script>

<template>
  <main>
    <HeroSection :demo-speed="demoSpeed" />
    <TheLoop />
    <DigitalTwinSection />
    <WhoItsFor />
    <VisibilityMV />
    <ResultsSection v-if="showProofMetrics" />
    <TeamSection />
    <CtaSection />
  </main>
</template>
