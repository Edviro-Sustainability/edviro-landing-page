<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { BOOK_DEMO_PATH, SITE_TAGLINE } from '@/seo/site'
</script>

<template>
  <!-- HERO: concrete, solution-first. The animated Signals-in / Actions-out visual now lives in WorkflowSection. -->
  <section id="top" style="position: relative; padding: 86px 32px 56px;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div style="max-width: 900px; margin: 0 auto; text-align: center;">
        <p style="margin: 0 0 22px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">{{ SITE_TAGLINE }}</p>
        <h1 style="margin: 0; font-weight: 400; font-size: clamp(40px, 6vw, 74px); line-height: 1.04; letter-spacing: -0.035em;">Find building problems.<br /><span style="color: var(--accent);">Get them fixed.</span></h1>
        <p style="margin: 26px auto 0; max-width: 680px; font-size: 19px; line-height: 1.55; color: #4B5550;">Energy, diagnostics, work orders, assets, and capital planning—connected from first signal to verified fix.</p>
        <p style="margin: 14px auto 0; max-width: 620px; font-size: 15.5px; line-height: 1.5; color: #171D1A; font-weight: 500;">Use Edviro directly or connect your existing CMMS.</p>
        <div style="margin-top: 34px; display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Book a demo</RouterLink>
          <a href="#solutions" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #171D1A; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #C0CCC3;">Explore solutions</a>
        </div>
        <div style="margin-top: 26px; display: flex; justify-content: center;">
          <a
            href="https://www.ycombinator.com/companies/edviro"
            target="_blank"
            rel="noopener noreferrer"
            style="display: inline-flex; align-items: center; gap: 9px; font-size: 13.5px; font-weight: 600; color: #171D1A; background: #FFFFFF; border: 1px solid #D8DED9; padding: 7px 15px 7px 9px; border-radius: 0; text-decoration: none;"
          >
            <span style="width: 19px; height: 19px; border-radius: 4px; background: #FB651E; color: #fff; font-weight: 700; font-size: 13px; display: inline-flex; align-items: center; justify-content: center; line-height: 1;">Y</span>
            Backed by Y Combinator
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.book-btn:hover {
  filter: brightness(1.12);
}
.outline-btn:hover {
  border-color: #171D1A !important;
}
</style>
