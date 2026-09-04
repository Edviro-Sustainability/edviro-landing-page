<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import SolutionsOverview from '@/components/SolutionsOverview.vue'
import TheLoop from '@/components/TheLoop.vue'
import WorkOrdersSection from '@/components/WorkOrdersSection.vue'
import DigitalTwinSection from '@/components/DigitalTwinSection.vue'
import WhoItsFor from '@/components/WhoItsFor.vue'
import VisibilityMV from '@/components/VisibilityMV.vue'
import ResultsSection from '@/components/ResultsSection.vue'
import FeaturedCustomers from '@/components/FeaturedCustomers.vue'
import TeamSection from '@/components/TeamSection.vue'
import CtaSection from '@/components/CtaSection.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { organizationLd, websiteLd, softwareApplicationLd } from '@/seo/jsonld'

const demoSpeed = 0.5
const showProofMetrics = true

usePageSeo({
  title: 'Edviro | AI Facilities & Energy Management Software for Schools',
  titleTemplate: null,
  description:
    'Edviro helps school districts monitor energy, diagnose building problems, manage work orders and assets, and plan capital projects—with native tools or integrations.',
  path: '/',
  jsonLd: [organizationLd(), websiteLd(), softwareApplicationLd()],
})
</script>

<template>
  <main>
    <HeroSection :demo-speed="demoSpeed" />
    <SolutionsOverview />
    <TheLoop />
    <WorkOrdersSection />
    <DigitalTwinSection />
    <VisibilityMV />
    <WhoItsFor />
    <ResultsSection v-if="showProofMetrics" />
    <FeaturedCustomers />
    <TeamSection />
    <CtaSection />
  </main>
</template>
