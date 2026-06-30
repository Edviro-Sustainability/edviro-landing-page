<script setup lang="ts">
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import TheLoop from './components/TheLoop.vue'
import WhoItsFor from './components/WhoItsFor.vue'
import VisibilityMV from './components/VisibilityMV.vue'
import ResultsSection from './components/ResultsSection.vue'
import TeamSection from './components/TeamSection.vue'
import CtaSection from './components/CtaSection.vue'
import SiteFooter from './components/SiteFooter.vue'

// Theme / content configuration (defaults from the original design component).
const accentColor = '#1C3F33'
const demoSpeed = 1
const showProofMetrics = true
</script>

<template>
  <div
    style="font-family: 'Hanken Grotesk', system-ui, sans-serif; color: #1A1B14; background: #F4F2EC; min-height: 100vh; overflow-x: hidden;"
    :style="{ '--accent': accentColor }"
  >
    <SiteNav />
    <HeroSection :demo-speed="demoSpeed" />
    <TheLoop />
    <WhoItsFor />
    <VisibilityMV />
    <ResultsSection v-if="showProofMetrics" />
    <TeamSection />
    <CtaSection />
    <SiteFooter />
  </div>
</template>
