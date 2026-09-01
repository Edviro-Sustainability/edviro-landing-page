<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePageSeo } from '@/seo/usePageSeo'

usePageSeo({
  title: 'Page not found',
  description: 'The page you were looking for could not be found.',
  path: '/404',
  noindex: true,
})
</script>

<template>
  <main style="padding: 140px 32px; min-height: 60vh;">
    <div style="max-width: 640px; margin: 0 auto; text-align: center;">
      <p style="margin: 0 0 18px; font-weight: 600; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #75817B;">404</p>
      <h1 style="margin: 0; font-weight: 400; font-size: clamp(34px, 5vw, 54px); line-height: 1.05; letter-spacing: -0.03em;">This page isn't here.</h1>
      <p style="margin: 22px auto 0; max-width: 460px; font-size: 18px; line-height: 1.6; color: #4B5550;">The link may be broken or the page may have moved. Let's get you back on track.</p>
      <div style="margin-top: 30px; display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <RouterLink to="/" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 26px; border-radius: 999px;">Back to home</RouterLink>
        <RouterLink to="/faq" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #171D1A; background: transparent; padding: 13px 24px; border-radius: 999px; border: 1px solid #C0CCC3;">Read the FAQ</RouterLink>
      </div>
    </div>
  </main>
</template>
