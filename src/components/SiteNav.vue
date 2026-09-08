<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logoWordmark from '@/assets/img/logo-wordmark.png'
import {
  ABOUT_PATH,
  ASSETS_PATH,
  BLOG_URL,
  BOOK_DEMO_PATH,
  CAPITAL_PLANNING_PATH,
  FACILITIES_OPS_PATH,
  FAQ_PATH,
  MV_PATH,
  SCHOOL_ENERGY_PATH,
  WORK_ORDERS_PATH,
} from '@/seo/site'

/**
 * Solution-led navigation. Plain facilities vocabulary first; the technical
 * loop lives under About → How Edviro works. Every destination is a live
 * route or a stable section id on the homepage / pillar page.
 */
type NavLink = { label: string; to: string | { path: string; hash: string }; external?: boolean; hint?: string }
type NavGroup = { id: string; label: string; links: NavLink[] }

const groups: NavGroup[] = [
  {
    id: 'solutions',
    label: 'Solutions',
    links: [
      { label: 'Energy monitoring', to: SCHOOL_ENERGY_PATH, hint: 'Energy management software for schools' },
      { label: 'Diagnostics and alerts', to: { path: FACILITIES_OPS_PATH, hash: '#diagnostics' }, hint: 'Find the likely cause, not just an alarm' },
      { label: 'Work orders and maintenance', to: WORK_ORDERS_PATH, hint: 'Intake, priority, assignment, verification' },
      { label: 'Assets and inspections', to: ASSETS_PATH, hint: 'Equipment records and service history' },
      { label: 'Capital planning', to: CAPITAL_PLANNING_PATH, hint: 'Repair-or-replace and multi-year plans' },
      { label: 'Measurement and verification', to: MV_PATH, hint: 'Prove that the fix worked' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    links: [
      { label: 'Blog', to: BLOG_URL, external: true, hint: 'Guides for school facilities teams' },
      { label: 'FAQ', to: FAQ_PATH, hint: 'Common questions, answered plainly' },
    ],
  },
  {
    id: 'about',
    label: 'About',
    links: [
      { label: 'How Edviro works', to: { path: '/', hash: '#how-it-works' }, hint: 'From the first signal to a verified fix' },
      { label: "Who it's for", to: { path: '/', hash: '#who' }, hint: 'Schools, construction teams, data centers' },
      { label: 'Company', to: ABOUT_PATH, hint: 'Team, story, and mission' },
    ],
  },
]

const route = useRoute()
const mobileOpen = ref(false)
const openGroup = ref<string | null>(null)
const navEl = ref<HTMLElement | null>(null)
const triggerEls = new Map<string, HTMLButtonElement>()

const setTrigger = (id: string, el: unknown) => {
  if (el instanceof HTMLButtonElement) triggerEls.set(id, el)
}

const closeAll = () => {
  mobileOpen.value = false
  openGroup.value = null
}

const toggleGroup = (id: string) => {
  openGroup.value = openGroup.value === id ? null : id
}

// Hover opens for pointer users; click/Enter/Space toggles for keyboard and touch.
const hoverOpen = (id: string) => {
  if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) openGroup.value = id
}
const hoverClose = (id: string) => {
  if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches && openGroup.value === id) {
    openGroup.value = null
  }
}

// Escape closes the open dropdown and returns focus to its trigger.
const onKeydown = (e: KeyboardEvent) => {
  if (e.key !== 'Escape') return
  if (openGroup.value) {
    const id = openGroup.value
    openGroup.value = null
    triggerEls.get(id)?.focus()
  } else if (mobileOpen.value) {
    mobileOpen.value = false
  }
}

const onDocumentClick = (e: MouseEvent) => {
  if (openGroup.value && navEl.value && !navEl.value.contains(e.target as Node)) openGroup.value = null
}

// Tabbing out of a dropdown closes it so focus never lands in an invisible menu.
const onGroupFocusOut = (id: string, e: FocusEvent) => {
  const next = e.relatedTarget as Node | null
  const wrapper = e.currentTarget as HTMLElement
  if (openGroup.value === id && (!next || !wrapper.contains(next))) openGroup.value = null
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onDocumentClick)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onDocumentClick)
})
watch(() => route.fullPath, closeAll)
</script>

<template>
  <header style="position: sticky; top: 0; z-index: 50; backdrop-filter: blur(14px); background: rgba(237,240,238,0.78); border-bottom: 1px solid #D8DED9;">
    <nav ref="navEl" aria-label="Primary" style="max-width: 1180px; margin: 0 auto; width: 100%; padding: 14px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px;" class="r-pad-x">
      <RouterLink to="/" aria-label="Edviro home" style="display: flex; align-items: center; text-decoration: none; color: inherit;" @click="closeAll">
        <img :src="logoWordmark" alt="Edviro" style="height: 28px; width: auto; display: block;" />
      </RouterLink>

      <!-- Desktop -->
      <div class="r-nav-desktop" style="display: flex; align-items: center; gap: 26px;">
        <ul style="display: flex; align-items: center; gap: 6px; font-size: 14.5px; color: #4B5550; list-style: none; margin: 0; padding: 0;">
          <template v-for="group in groups" :key="group.id">
            <li
              style="position: relative;"
              @mouseenter="hoverOpen(group.id)"
              @mouseleave="hoverClose(group.id)"
              @focusout="onGroupFocusOut(group.id, $event)"
            >
              <button
                :ref="(el) => setTrigger(group.id, el)"
                type="button"
                class="nav-trigger"
                :class="{ 'is-open': openGroup === group.id }"
                :aria-expanded="openGroup === group.id"
                :aria-controls="`nav-menu-${group.id}`"
                @click="toggleGroup(group.id)"
              >
                {{ group.label }}
                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 160ms;" :style="{ transform: openGroup === group.id ? 'rotate(180deg)' : 'none' }"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <!-- Padding (not margin) bridges the trigger and the panel so hover never drops across the gap. -->
              <div
                :id="`nav-menu-${group.id}`"
                class="nav-menu"
                :class="{ 'is-wide': group.id === 'solutions' }"
                :hidden="openGroup !== group.id"
              >
                <div class="nav-menu-inner">
                  <ul style="list-style: none; margin: 0; padding: 0; display: grid; gap: 2px;" :style="group.id === 'solutions' ? 'grid-template-columns: 1fr 1fr;' : ''">
                    <li v-for="link in group.links" :key="link.label">
                      <a v-if="link.external" :href="link.to as string" class="nav-menu-link" @click="closeAll">
                        <span class="nav-menu-label">{{ link.label }}</span>
                        <span v-if="link.hint" class="nav-menu-hint">{{ link.hint }}</span>
                      </a>
                      <RouterLink v-else :to="link.to" class="nav-menu-link" @click="closeAll">
                        <span class="nav-menu-label">{{ link.label }}</span>
                        <span v-if="link.hint" class="nav-menu-hint">{{ link.hint }}</span>
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <!-- "Schools" sits between Solutions and Resources as a top-level page link. -->
            <li v-if="group.id === 'solutions'">
              <RouterLink :to="FACILITIES_OPS_PATH" class="nav-link">Schools</RouterLink>
            </li>
          </template>
        </ul>
        <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="font-size: 14.5px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 10px 18px; border-radius: 999px; white-space: nowrap;">Book a demo</RouterLink>
      </div>

      <!-- Mobile toggle -->
      <button
        type="button"
        class="r-nav-toggle nav-toggle"
        :aria-expanded="mobileOpen"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
        aria-controls="mobile-menu"
        style="appearance: none; background: none; border: 1px solid #C0CCC3; border-radius: 10px; width: 42px; height: 42px; align-items: center; justify-content: center; cursor: pointer; color: #171D1A;"
        @click="mobileOpen = !mobileOpen"
      >
        <svg v-if="!mobileOpen" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        <svg v-else aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
    </nav>

    <!-- Mobile panel: grouped, single-column, large tap targets -->
    <div
      id="mobile-menu"
      class="r-nav-panel"
      :class="{ 'is-open': mobileOpen }"
      style="border-top: 1px solid #D8DED9; background: rgba(237,240,238,0.97); padding: 8px 20px 20px; max-height: calc(100vh - 72px); overflow-y: auto;"
    >
      <nav aria-label="Mobile">
        <section v-for="group in groups" :key="group.id" style="padding: 10px 0 6px; border-bottom: 1px solid #DCE3DD;">
          <div :id="`mobile-group-${group.id}`" style="margin: 0 0 4px; font-size: 11.5px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #6B7570;">{{ group.label }}</div>
          <ul :aria-labelledby="`mobile-group-${group.id}`" style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column;">
            <li v-for="link in group.links" :key="link.label">
              <a v-if="link.external" :href="link.to as string" class="mobile-link" @click="closeAll">{{ link.label }}</a>
              <RouterLink v-else :to="link.to" class="mobile-link" @click="closeAll">{{ link.label }}</RouterLink>
            </li>
          </ul>
          <RouterLink v-if="group.id === 'solutions'" :to="FACILITIES_OPS_PATH" class="mobile-link" style="font-weight: 500;" @click="closeAll">Schools: the full facilities platform</RouterLink>
        </section>
        <RouterLink :to="BOOK_DEMO_PATH" class="book-btn" style="display: block; text-align: center; margin-top: 16px; font-size: 15px; font-weight: 500; text-decoration: none; color: #EDF0EE; background: var(--accent); padding: 13px 18px; border-radius: 999px;" @click="closeAll">Book a demo</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav-link,
.nav-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  appearance: none;
  background: none;
  border: 0;
  font: inherit;
  font-size: 14.5px;
  color: #4B5550;
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
}
.nav-link:hover,
.nav-trigger:hover,
.nav-trigger.is-open {
  color: #171D1A;
  background: rgba(23, 29, 26, 0.05);
}
.nav-link:focus-visible,
.nav-trigger:focus-visible,
.nav-menu-link:focus-visible,
.mobile-link:focus-visible,
.book-btn:focus-visible,
.nav-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.nav-menu {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 8px;
  min-width: 260px;
}
.nav-menu.is-wide {
  min-width: 560px;
}
.nav-menu-inner {
  padding: 8px;
  background: #F7F9F7;
  border: 1px solid #D8DED9;
  border-radius: 14px;
  box-shadow: 0 18px 40px rgba(23, 29, 26, 0.12);
}
.nav-menu-link {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: #171D1A;
}
.nav-menu-link:hover {
  background: rgba(23, 29, 26, 0.05);
}
.nav-menu-label {
  font-size: 14.5px;
  font-weight: 500;
}
.nav-menu-hint {
  font-size: 12.5px;
  color: #6B7570;
}
.book-btn:hover {
  filter: brightness(1.12);
}
.mobile-link {
  display: block;
  text-decoration: none;
  color: #171D1A;
  font-size: 17px;
  padding: 11px 4px;
}
.mobile-link:active {
  opacity: 0.6;
}
.nav-toggle:hover {
  border-color: #171D1A !important;
}
</style>
