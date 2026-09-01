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
  <!-- NAV -->
  <header style="position: sticky; top: 0; z-index: 50; backdrop-filter: blur(14px); background: rgba(237,240,238,0.78); border-bottom: 1px solid #D8DED9;">
    <nav style="max-width: 1180px; margin: 0 auto; width: 100%; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px;" class="r-pad-x">
      <RouterLink to="/" aria-label="Edviro home" style="display: flex; align-items: center; text-decoration: none; color: inherit;" @click="close">
        <img :src="logoWordmark" alt="Edviro" style="height: 28px; width: auto; display: block;" />
      </RouterLink>

      <!-- Desktop links -->
      <div class="r-nav-desktop" style="display: flex; align-items: center; gap: 30px;">
        <div style="display: flex; gap: 28px; font-size: 14.5px; color: #4B5550;">
          <RouterLink :to="{ path: '/', hash: '#loop' }" class="nav-link" style="text-decoration: none; color: inherit;">The loop</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#how' }" class="nav-link" style="text-decoration: none; color: inherit;">Who it's for</RouterLink>
          <RouterLink to="/capital-planning/" class="nav-link" style="text-decoration: none; color: inherit;">Capital planning</RouterLink>
          <RouterLink to="/measurement-and-verification/" class="nav-link" style="text-decoration: none; color: inherit;">M&amp;V</RouterLink>
          <RouterLink to="/faq/" class="nav-link" style="text-decoration: none; color: inherit;">FAQ</RouterLink>
          <a :href="BLOG_URL" class="nav-link" style="text-decoration: none; color: inherit;">Blog</a>
          <RouterLink to="/about/" class="nav-link" style="text-decoration: none; color: inherit;">About</RouterLink>
        </div>
        <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 14.5px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 10px 18px; border-radius: 999px;">Book a demo</RouterLink>
      </div>

      <!-- Mobile menu toggle -->
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

    <!-- Mobile dropdown panel -->
    <div
      id="mobile-menu"
      class="r-nav-panel"
      :class="{ 'is-open': open }"
      style="border-top: 1px solid #D8DED9; background: rgba(237,240,238,0.96); padding: 12px 20px 20px;"
    >
      <div style="display: flex; flex-direction: column;">
        <RouterLink :to="{ path: '/', hash: '#loop' }" class="mobile-link" style="text-decoration: none; color: #171D1A; font-size: 17px; padding: 13px 4px; border-bottom: 1px solid #DCE3DD;" @click="close">The loop</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#how' }" class="mobile-link" style="text-decoration: none; color: #171D1A; font-size: 17px; padding: 13px 4px; border-bottom: 1px solid #DCE3DD;" @click="close">Who it's for</RouterLink>
        <RouterLink to="/capital-planning/" class="mobile-link" style="text-decoration: none; color: #171D1A; font-size: 17px; padding: 13px 4px; border-bottom: 1px solid #DCE3DD;" @click="close">Capital planning</RouterLink>
        <RouterLink to="/measurement-and-verification/" class="mobile-link" style="text-decoration: none; color: #171D1A; font-size: 17px; padding: 13px 4px; border-bottom: 1px solid #DCE3DD;" @click="close">M&amp;V</RouterLink>
        <RouterLink to="/faq/" class="mobile-link" style="text-decoration: none; color: #171D1A; font-size: 17px; padding: 13px 4px; border-bottom: 1px solid #DCE3DD;" @click="close">FAQ</RouterLink>
        <a :href="BLOG_URL" class="mobile-link" style="text-decoration: none; color: #171D1A; font-size: 17px; padding: 13px 4px; border-bottom: 1px solid #DCE3DD;" @click="close">Blog</a>
        <RouterLink to="/about/" class="mobile-link" style="text-decoration: none; color: #171D1A; font-size: 17px; padding: 13px 4px;" @click="close">About</RouterLink>
      </div>
      <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="display: block; text-align: center; margin-top: 16px; font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 18px; border-radius: 999px;" @click="close">Book a demo</RouterLink>
    </div>
  </header>
</template>

<style scoped>
.nav-link:hover {
  color: #171D1A !important;
}
.book-btn:hover {
  filter: brightness(1.12);
}
.mobile-link:active {
  opacity: 0.6;
}
.nav-toggle:hover {
  border-color: #171D1A !important;
}
</style>
