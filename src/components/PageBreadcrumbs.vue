<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { BreadcrumbItem } from '@/seo/jsonld'

defineProps<{ items: BreadcrumbItem[] }>()
</script>

<template>
  <nav aria-label="Breadcrumb" style="max-width: 1180px; margin: 0 auto; width: 100%; padding: 28px 32px 0;">
    <ol style="list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; letter-spacing: 0.08em; text-transform: uppercase; color: #8A8A7C;">
      <li v-for="(item, i) in items" :key="item.path" style="display: flex; align-items: center; gap: 8px;">
        <RouterLink
          v-if="i < items.length - 1"
          :to="item.path"
          class="crumb-link"
          style="color: #8A8A7C; text-decoration: none;"
        >{{ item.name }}</RouterLink>
        <span v-else aria-current="page" style="color: #1A1B14;">{{ item.name }}</span>
        <span v-if="i < items.length - 1" aria-hidden="true" style="color: #C7C3B5;">/</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.crumb-link:hover {
  color: #1a1b14 !important;
}
</style>
