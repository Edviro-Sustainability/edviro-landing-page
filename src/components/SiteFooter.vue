<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logoIcon from '@/assets/img/logo-icon.png'
import {
  ABOUT_PATH,
  ASSETS_PATH,
  BLOG_URL,
  BOOK_DEMO_PATH,
  BRAND_STATEMENT,
  CAPITAL_PLANNING_PATH,
  CMMS_PATH,
  CONTACT_EMAIL,
  FACILITIES_OPS_PATH,
  FAQ_PATH,
  LINKEDIN_URL,
  MV_PATH,
  SCHOOL_ENERGY_PATH,
  WORK_ORDERS_PATH,
  X_URL,
} from '@/seo/site'

const columns = [
  {
    heading: 'Solutions',
    links: [
      { label: 'Energy management software for schools', to: SCHOOL_ENERGY_PATH },
      { label: 'School facilities operations', to: FACILITIES_OPS_PATH },
      { label: 'School work-order software', to: WORK_ORDERS_PATH },
      { label: 'CMMS for schools', to: CMMS_PATH },
      { label: 'School asset management', to: ASSETS_PATH },
      { label: 'Capital planning', to: CAPITAL_PLANNING_PATH },
      { label: 'Measurement and verification', to: MV_PATH },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: ABOUT_PATH },
      { label: 'FAQ', to: FAQ_PATH },
      { label: 'Book a demo', to: BOOK_DEMO_PATH },
    ],
  },
]
</script>

<template>
  <!-- FOOTER -->
  <footer style="padding: 56px 32px 34px; background: #101815; color: #79867E;">
    <div style="max-width: 1180px; margin: 0 auto; width: 100%;">
      <div class="r-cols-3" style="display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 40px; padding-bottom: 36px; border-bottom: 1px solid #26302A;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <img :src="logoIcon" alt="" style="width: 20px; height: 20px; border-radius: 6px; display: block;" />
            <span style="font-size: 17px; font-weight: 600; letter-spacing: -0.02em; color: #EDF0EE;">Edviro</span>
          </div>
          <p style="margin: 14px 0 0; font-size: 15px; color: #C4CBC5; line-height: 1.5;">{{ BRAND_STATEMENT }}</p>
          <p style="margin: 10px 0 0; max-width: 380px; font-size: 13.5px; line-height: 1.55;">AI-powered facilities operations for schools: energy monitoring, diagnostics, work orders, assets, and capital planning in one place. Use Edviro as your work-order and asset system—or connect the systems you already have.</p>
        </div>
        <nav v-for="col in columns" :key="col.heading" :aria-label="`Footer: ${col.heading}`">
          <div style="font-weight: 600; font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; color: #6B7A72; margin-bottom: 14px;">{{ col.heading }}</div>
          <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 9px;">
            <li v-for="link in col.links" :key="link.label">
              <RouterLink :to="link.to" class="footer-link" style="font-size: 13.5px; color: #A7B4AB; text-decoration: none;">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
      <div style="padding-top: 22px; display: flex; flex-wrap: wrap; gap: 16px 24px; align-items: center; justify-content: space-between;">
        <div style="font-size: 12.5px;">© {{ new Date().getFullYear() }} Edviro. Backed by Y Combinator.</div>
        <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
          <a :href="BLOG_URL" class="footer-link" style="font-weight: 500; font-size: 12.5px; color: #79867E; text-decoration: none;">Blog</a>
          <a :href="LINKEDIN_URL" target="_blank" rel="noopener" class="footer-link" style="font-weight: 500; font-size: 12.5px; color: #79867E; text-decoration: none;">LinkedIn</a>
          <a :href="X_URL" target="_blank" rel="noopener" class="footer-link" style="font-weight: 500; font-size: 12.5px; color: #79867E; text-decoration: none;">X</a>
          <a :href="`mailto:${CONTACT_EMAIL}`" class="footer-link" style="font-weight: 500; font-size: 12.5px; color: #79867E; text-decoration: none;">{{ CONTACT_EMAIL }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-link:hover {
  color: #edf0ee !important;
}
</style>
