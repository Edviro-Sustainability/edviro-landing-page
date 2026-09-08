<script setup lang="ts">
import HeroSection from '@/components/HeroSection.vue'
import SolutionGrid from '@/components/SolutionGrid.vue'
import WorkflowSection from '@/components/WorkflowSection.vue'
import WorkOrdersSection from '@/components/WorkOrdersSection.vue'
import EnergySection from '@/components/EnergySection.vue'
import PlanningSection from '@/components/PlanningSection.vue'
import ResultsSection from '@/components/ResultsSection.vue'
import FeaturedCustomers from '@/components/FeaturedCustomers.vue'
import WhoItsFor from '@/components/WhoItsFor.vue'
import CtaSection from '@/components/CtaSection.vue'
import { usePageSeo } from '@/seo/usePageSeo'
import { organizationLd, websiteLd, softwareApplicationLd } from '@/seo/jsonld'

// 0.5 = half speed; the workflow demo's step timers scale as 560ms / demoSpeed.
// Slowed from 1 because the card copy was unreadable at full pace.
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
  <!--
    Order is deliberate: customer logos right under the hero, then familiar
    facilities language (solutions, workflow, work orders, energy, planning,
    verification, and proof) before audiences. Systems live inside energy;
    measurement and verification lives inside planning. The technical loop and
    the team live on /about/.
  -->
  <main>
    <HeroSection />
    <FeaturedCustomers />
    <SolutionGrid />
    <WorkflowSection :demo-speed="demoSpeed" />
    <WorkOrdersSection />
    <EnergySection />
    <PlanningSection />
    <ResultsSection v-if="showProofMetrics" />
    <WhoItsFor />
    <CtaSection />
  </main>
</template>
