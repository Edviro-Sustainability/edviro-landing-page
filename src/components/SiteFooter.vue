<script setup lang="ts">
import logoIcon from '@/assets/img/logo-icon.png'
import { BLOG_URL } from '@/seo/site'
</script>

<template>
  <!-- FOOTER -->
  <footer style="padding: 34px 32px; background: #16170F; color: #8E907F;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <img :src="logoIcon" alt="Edviro" style="width: 20px; height: 20px; border-radius: 6px; display: block;" />
        <span style="font-size: 17px; font-weight: 600; letter-spacing: -0.02em; color: #F4F2EC;">Edviro</span>
      </div>
      <div style="font-size: 13px;">AI for the people who run the built environment.</div>
      <div style="display: flex; align-items: center; gap: 20px;">
        <a :href="BLOG_URL" class="footer-link" style="font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: #8E907F; text-decoration: none;">Blog</a>
        <a href="mailto:founders@edviroenergy.com" class="footer-link" style="font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: #8E907F; text-decoration: none;">founders@edviroenergy.com</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link:hover {
  color: #f4f2ec !important;
}
</style>
