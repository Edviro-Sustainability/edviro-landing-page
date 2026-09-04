<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import logoWordmark from '@/assets/img/logo-wordmark.png'
import { BLOG_URL, BOOK_DEMO_PATH } from '@/seo/site'

const open = ref(false)
const close = () => {
  open.value = false
}
</script>

<template>
  <header style="position: sticky; top: 0; z-index: 50; backdrop-filter: blur(14px); background: rgba(237,240,238,0.88); border-bottom: 1px solid #D8DED9;">
    <nav style="max-width: 1180px; margin: 0 auto; width: 100%; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px;" class="r-pad-x">
      <RouterLink to="/" aria-label="Edviro home" style="display: flex; align-items: center; text-decoration: none; color: inherit;" @click="close">
        <img :src="logoWordmark" alt="Edviro" style="height: 28px; width: auto; display: block;" />
      </RouterLink>

      <div class="r-nav-desktop" style="display: flex; align-items: center; gap: 26px;">
        <div style="display: flex; gap: 24px; align-items: center; font-size: 14.5px; color: #4B5550;">
          <details class="nav-details" style="position: relative;">
            <summary class="nav-link" style="cursor: pointer; list-style: none;">Solutions <span aria-hidden="true">▾</span></summary>
            <div class="nav-dropdown">
              <RouterLink to="/solutions/school-facilities-operations/">Facilities operations</RouterLink>
              <RouterLink :to="{ path: '/', hash: '#work-orders' }">Work orders &amp; assets</RouterLink>
              <RouterLink to="/solutions/schools/">Energy monitoring</RouterLink>
              <RouterLink to="/capital-planning/">Capital planning</RouterLink>
              <RouterLink to="/measurement-and-verification/">Measurement &amp; verification</RouterLink>
            </div>
          </details>
          <RouterLink to="/solutions/schools/" class="nav-link" style="text-decoration: none; color: inherit;">Schools</RouterLink>
          <a :href="BLOG_URL" class="nav-link" style="text-decoration: none; color: inherit;">Resources</a>
          <RouterLink to="/about/" class="nav-link" style="text-decoration: none; color: inherit;">About</RouterLink>
        </div>
        <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 14.5px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 10px 18px; border-radius: 999px;">Book a demo</RouterLink>
      </div>

      <button
        type="button"
        class="r-nav-toggle nav-toggle"
        :aria-expanded="open"
        aria-label="Toggle menu"
        aria-controls="mobile-menu"
        style="appearance: none; background: none; border: 1px solid #C0CCC3; border-radius: 10px; width: 42px; height: 42px; align-items: center; justify-content: center; cursor: pointer; color: #171D1A;"
        @click="open = !open"
      >
        <svg v-if="!open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
    </nav>

    <div id="mobile-menu" class="r-nav-panel" :class="{ 'is-open': open }" style="border-top: 1px solid #D8DED9; background: rgba(237,240,238,0.98); padding: 12px 20px 20px;">
      <div style="display: flex; flex-direction: column;">
        <span class="mobile-label">Solutions</span>
        <RouterLink to="/solutions/school-facilities-operations/" class="mobile-link" @click="close">Facilities operations</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#work-orders' }" class="mobile-link" @click="close">Work orders &amp; assets</RouterLink>
        <RouterLink to="/solutions/schools/" class="mobile-link" @click="close">Energy monitoring for schools</RouterLink>
        <RouterLink to="/capital-planning/" class="mobile-link" @click="close">Capital planning</RouterLink>
        <RouterLink to="/measurement-and-verification/" class="mobile-link" @click="close">Measurement &amp; verification</RouterLink>
        <a :href="BLOG_URL" class="mobile-link" @click="close">Resources</a>
        <RouterLink to="/about/" class="mobile-link" @click="close">About</RouterLink>
      </div>
      <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="display: block; text-align: center; margin-top: 16px; font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 18px; border-radius: 999px;" @click="close">Book a demo</RouterLink>
    </div>
  </header>
</template>

<style scoped>
.nav-link:hover { color: #171D1A !important; }
.book-btn:hover { filter: brightness(1.12); }
.nav-toggle:hover { border-color: #171D1A !important; }
.nav-details summary::-webkit-details-marker { display: none; }
.nav-dropdown {
  position: absolute;
  top: calc(100% + 14px);
  left: -18px;
  width: 260px;
  padding: 10px;
  border: 1px solid #D8DED9;
  border-radius: 14px;
  background: #F9FAF9;
  box-shadow: 0 16px 38px rgba(16, 24, 21, 0.12);
}
.nav-dropdown a {
  display: block;
  padding: 10px 11px;
  border-radius: 8px;
  color: #39443E;
  text-decoration: none;
}
.nav-dropdown a:hover { background: #EDF0EE; color: #171D1A; }
.mobile-label {
  padding: 12px 4px 7px;
  color: #75817B;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}
.mobile-link {
  color: #171D1A;
  font-size: 17px;
  padding: 12px 4px;
  border-bottom: 1px solid #DCE3DD;
  text-decoration: none;
}
.mobile-link:active { opacity: 0.6; }
</style>
