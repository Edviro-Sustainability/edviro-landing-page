<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { usePageSeo } from '@/seo/usePageSeo'
import {
  DEMO_BOOKED_CONVERSION,
  DEMO_BOOKED_LINKEDIN_CONVERSION,
  DEMO_BOOKED_OPENAI_EVENT,
  DEMO_BOOKED_PATH,
} from '@/seo/site'

usePageSeo({
  title: 'Your demo is booked',
  description: 'Your Edviro demo is confirmed. Here is what happens next.',
  path: DEMO_BOOKED_PATH,
  noindex: true,
})

// Populated from the query string Calendly appends when "pass event details to
// your redirected page" is on. Absent if that setting is off, so the page reads
// correctly either way.
const firstName = ref('')
const startTime = ref('')

/**
 * Guards against reporting the same booking twice, which a refresh of this page
 * would otherwise do. Keyed on the query string so a genuinely different booking
 * in the same tab still counts.
 */
function claimReport(key: string): boolean {
  try {
    if (window.sessionStorage.getItem(key)) return false
    window.sessionStorage.setItem(key, '1')
  } catch {
    // Storage blocked by the browser. Reporting twice on a refresh is a better
    // failure than dropping the conversion entirely, so fall through and report.
  }
  return true
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search)

  firstName.value =
    params.get('invitee_first_name')?.trim() ||
    params.get('invitee_full_name')?.trim().split(/\s+/)[0] ||
    ''

  const start = params.get('event_start_time')
  if (start) {
    const parsed = new Date(start)
    if (!Number.isNaN(parsed.getTime())) {
      startTime.value = parsed.toLocaleString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    }
  }

  if (!claimReport(`edviro:booking-reported:${window.location.search}`)) return

  // Enhanced conversions. The conversion action is configured with the
  // "JavaScript variables" method reading edviroBookingEmail, and the
  // gtag('set') covers the in-page-code path; both hash the address before
  // sending. Email only: Calendly's redirect carries no postal code or
  // country, and Google ignores name/address unless all four of first name,
  // last name, postal code, and country are present.
  const email = params.get('invitee_email')?.trim().toLowerCase()
  if (email) {
    window.edviroBookingEmail = email
    window.gtag?.('set', 'user_data', { email })
  }

  // Reaching this page means Calendly confirmed the booking. Tags come from
  // index.html; each call is optional so a blocked tag cannot break the others.
  window.gtag?.('event', 'conversion', { send_to: DEMO_BOOKED_CONVERSION })
  window.oaiq?.('measure', DEMO_BOOKED_OPENAI_EVENT, { type: 'customer_action' })
  window.lintrk?.('track', { conversion_id: DEMO_BOOKED_LINKEDIN_CONVERSION })
})
</script>

<template>
  <main style="padding: 90px 32px 100px;">
    <div style="max-width: 700px; margin: 0 auto;">
      <p style="margin: 0 0 22px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8A7C;">Demo booked</p>
      <h1 style="margin: 0; font-weight: 400; font-size: clamp(34px, 5vw, 56px); line-height: 1.05; letter-spacing: -0.035em;">You're on the calendar<span v-if="firstName">, {{ firstName }}</span>.</h1>
      <p v-if="startTime" style="margin: 24px 0 0; font-family: 'IBM Plex Mono', monospace; font-size: 14.5px; letter-spacing: 0.02em; color: var(--accent);">{{ startTime }}</p>
      <p style="margin: 22px 0 0; max-width: 560px; font-size: 18px; line-height: 1.62; color: #55564C;">A calendar invite is on its way, and we are looking forward to it.</p>
      <p style="margin: 18px 0 0; max-width: 560px; font-size: 17px; line-height: 1.62; color: #6B6C5E;">These calls typically involve a director of maintenance, operations, facilities, sustainability, business, or finance — but anyone is welcome, so bring whoever should hear it.</p>

      <h2 style="margin: 54px 0 28px; font-weight: 400; font-size: clamp(24px, 3.2vw, 34px); line-height: 1.1; letter-spacing: -0.03em;">What happens next</h2>
      <ol style="margin: 0; padding: 0; list-style: none; display: grid; gap: 1px; background: #E3E0D5; border: 1px solid #E3E0D5; border-radius: 16px; overflow: hidden;">
        <li style="background: #FBFAF6; padding: 22px 24px;">
          <h3 style="margin: 0 0 6px; font-size: 17px; font-weight: 600;">A scoping call</h3>
          <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">We walk you through Edviro, then talk through your portfolio: which sites, which systems, and where you already suspect money is going.</p>
        </li>
        <li style="background: #FBFAF6; padding: 22px 24px;">
          <h3 style="margin: 0 0 6px; font-size: 17px; font-weight: 600;">A quote for what you need</h3>
          <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">Priced per connected site and scoped to exactly what your school needs, so you are not paying for the parts you will not use.</p>
        </li>
        <li style="background: #FBFAF6; padding: 22px 24px;">
          <h3 style="margin: 0 0 6px; font-size: 17px; font-weight: 600;">Data, then your initial report</h3>
          <p style="margin: 0; font-size: 15.5px; line-height: 1.6; color: #6B6C5E;">We gather your bills and meter data, get Edviro reading your sites, and come back with an initial report on what it found.</p>
        </li>
      </ol>

      <p style="margin: 42px 0 14px; font-size: 15.5px; color: #6B6C5E;">While you wait:</p>
      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        <RouterLink to="/measurement-and-verification" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #1A1B14; padding: 13px 24px; border-radius: 999px; border: 1px solid #CFCBBD;">How we prove savings</RouterLink>
        <RouterLink to="/capital-planning" class="outline-btn" style="font-size: 15px; font-weight: 500; text-decoration: none; color: #1A1B14; padding: 13px 24px; border-radius: 999px; border: 1px solid #CFCBBD;">Capital planning</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.outline-btn:hover {
  border-color: #1a1b14 !important;
}
</style>
