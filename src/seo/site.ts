/**
 * Site-wide constants used to build canonical URLs, OpenGraph/Twitter tags,
 * and JSON-LD structured data. Keep the production host in sync with the
 * deployed domain so canonical and social URLs resolve correctly.
 */
export const SITE_URL = 'https://edviroenergy.com'
export const SITE_NAME = 'Edviro'
export const SITE_TAGLINE = 'AI-powered facilities operations for schools'

export const DEFAULT_DESCRIPTION =
  'Edviro is AI facilities and energy management software for schools, combining diagnostics, work orders, assets, inspections, capital planning, and measurement and verification.'

export const DEFAULT_OG_IMAGE = '/og-image.png'
export const LOGO_PATH = '/logo-icon.png'

export const CONTACT_EMAIL = 'founders@edviroenergy.com'
export const BLOG_URL = 'https://blog.edviroenergy.com'

/**
 * Public profiles, used for the footer links and Organization `sameAs`. The X
 * account is Hursh's personal profile rather than a brand account, so swap it
 * here if Edviro ever gets its own.
 */
export const LINKEDIN_URL = 'https://www.linkedin.com/company/edviro/'
export const X_URL = 'https://x.com/hursheybar2'
export const X_HANDLE = '@hursheybar2'
export const SOCIAL_URLS = [LINKEDIN_URL, X_URL]

export const BOOK_DEMO_PATH = '/book-a-demo/'
export const DEMO_REDIRECT_PATH = '/demo/'
export const BOOKING_URL = 'https://calendly.com/tanuj-edviroenergy/30min'
export const DEMO_BOOKED_PATH = '/demo-booked/'

export const IUSD_DEMO_PATH = '/iusd-sustainability-demo'
export const IUSD_DEMO_URL = 'https://edviro-community-iusd.tanujsiripurapu.workers.dev'

export const DEMO_BOOKED_CONVERSION = 'AW-18357307098/d7uNCNjHztgcENqNubFE'
export const DEMO_BOOKED_LINKEDIN_CONVERSION = 27472820
export const DEMO_CLICK_OPENAI_EVENT = 'lead_created'
export const DEMO_BOOKED_OPENAI_EVENT = 'appointment_scheduled'

export const POSTHOG_KEY = 'phc_wxopt9vg92BkT58Yr3zNmK4aKQ89afVbFDgoj9uin2YL'
export const POSTHOG_HOST = 'https://us.i.posthog.com'

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

export function canonicalUrl(path: string): string {
  if (!path || path === '/') return `${SITE_URL}/`
  const clean = path.replace(/\/+$/, '')
  return absoluteUrl(`${clean}/`)
}
