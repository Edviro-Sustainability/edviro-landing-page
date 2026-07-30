/**
 * Site-wide constants used to build canonical URLs, OpenGraph/Twitter tags,
 * and JSON-LD structured data. Keep the production host in sync with the
 * deployed domain so canonical and social URLs resolve correctly.
 */
export const SITE_URL = 'https://edviroenergy.com'
export const SITE_NAME = 'Edviro'
export const SITE_TAGLINE = 'AI for building operations'

export const DEFAULT_DESCRIPTION =
  'Edviro puts AI across your fragmented building data — bills, meters, BMS, and work orders — then catches waste, fixes it, proves the savings with audit-grade M&V, and builds a digital twin for capital planning.'

export const DEFAULT_OG_IMAGE = '/og-image.png'
export const LOGO_PATH = '/logo-icon.png'

export const CONTACT_EMAIL = 'founders@edviroenergy.com'
export const BLOG_URL = 'https://blog.edviroenergy.com'

/**
 * Every "Book a demo" CTA points at this page, which explains the demo, the
 * free bill audit, and pricing. It is also the Google Ads conversion page.
 */
export const BOOK_DEMO_PATH = '/book-a-demo'

/**
 * Scheduling links point here rather than straight at BOOKING_URL, so changing
 * schedulers (or the Calendly event) is a one-line edit below. Only the
 * redirect page reads BOOKING_URL.
 */
export const DEMO_REDIRECT_PATH = '/demo'
export const BOOKING_URL = 'https://calendly.com/tanuj-edviroenergy/30min'

/**
 * Where Calendly returns invitees after they book. Reaching it is the confirmed
 * booking, so the ad conversions below are reported from this page rather than
 * from the click that opened the scheduler.
 */
export const DEMO_BOOKED_PATH = '/demo-booked'

/*
 * Ad conversions. All three tags load from index.html, and all three are reported
 * from DEMO_BOOKED_PATH so they count confirmed bookings. The IDs are unchanged
 * from when they fired on the click, so nothing needs recreating in the ad
 * dashboards — but the Google conversion action is still *named* for a click
 * there, and its history mixes both definitions.
 */
export const DEMO_BOOKED_CONVERSION = 'AW-18357307098/d7uNCNjHztgcENqNubFE'
export const DEMO_BOOKED_LINKEDIN_CONVERSION = 27472820

/**
 * OpenAI Ads standard events. The taxonomy has a name for each half of the
 * funnel, so unlike Google and LinkedIn no second conversion has to be created:
 * the click "requests contact" and the redirect back confirms the appointment.
 * These must match the conversion events configured in OpenAI Ads Manager.
 */
export const DEMO_CLICK_OPENAI_EVENT = 'lead_created'
export const DEMO_BOOKED_OPENAI_EVENT = 'appointment_scheduled'

// PostHog project API token — publishable, safe to ship in the client
// bundle (same convention as the blog's Supabase publishable key).
export const POSTHOG_KEY = 'phc_wxopt9vg92BkT58Yr3zNmK4aKQ89afVbFDgoj9uin2YL'
export const POSTHOG_HOST = 'https://us.i.posthog.com'

/** Join a root-relative path with the canonical site origin. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

/** Canonical URL for a route path (no trailing slash except the root). */
export function canonicalUrl(path: string): string {
  if (!path || path === '/') return `${SITE_URL}/`
  const clean = path.replace(/\/+$/, '')
  return absoluteUrl(clean)
}
