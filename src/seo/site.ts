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
 * Google Ads conversion, reported when someone reaches BOOK_DEMO_PATH. That
 * page is only linked from CTAs, so a view of it is a demo-intent click. The
 * Google tag itself loads from index.html.
 */
export const BOOK_DEMO_CONVERSION = 'AW-18357307098/d7uNCNjHztgcENqNubFE'

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
