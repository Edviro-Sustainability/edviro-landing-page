<script setup lang="ts">
import logoWordmark from '@/assets/img/logo-wordmark.png'
</script>

<template>
  <!-- NAV -->
  <header style="position: sticky; top: 0; z-index: 50; backdrop-filter: blur(14px); background: rgba(244,242,236,0.78); border-bottom: 1px solid #E3E0D5;">
    <nav style="max-width: 1180px; margin: 0 auto; width: 100%; padding: 16px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px;">
      <a href="#top" style="display: flex; align-items: center; text-decoration: none; color: inherit;">
        <img :src="logoWordmark" alt="Edviro" style="height: 28px; width: auto; display: block;" />
      </a>
      <div style="display: flex; align-items: center; gap: 30px;">
        <div style="display: flex; gap: 28px; font-size: 14.5px; color: #55564C;">
          <a href="#loop" class="nav-link" style="text-decoration: none; color: inherit;">The loop</a>
          <a href="#how" class="nav-link" style="text-decoration: none; color: inherit;">Who it's for</a>
          <a href="#mv" class="nav-link" style="text-decoration: none; color: inherit;">M&amp;V</a>
          <a href="#team" class="nav-link" style="text-decoration: none; color: inherit;">Team</a>
        </div>
        <a href="https://calendly.com/hursh-edviroenergy/new-meeting" target="_blank" rel="noopener" class="book-btn" style="font-size: 14.5px; font-weight: 500; text-decoration: none; color: #F4F2EC; background: var(--accent); padding: 10px 18px; border-radius: 999px;">Book a demo</a>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link:hover {
  color: #1a1b14 !important;
}
.book-btn:hover {
  filter: brightness(1.12);
}
</style>
