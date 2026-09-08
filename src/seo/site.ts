/**
 * Site-wide constants used to build canonical URLs, OpenGraph/Twitter tags,
 * and JSON-LD structured data. Keep the production host in sync with the
 * deployed domain so canonical and social URLs resolve correctly.
 */
export const SITE_URL = 'https://edviroenergy.com'
export const SITE_NAME = 'Edviro'
/** Buyer-friendly category. Used in social-image alt text and the hero eyebrow. */
export const SITE_TAGLINE = 'AI-powered facilities operations for schools'
/** Secondary brand statement (footer). */
export const BRAND_STATEMENT = 'AI for the people who run the buildings.'
/** Brand promise. */
export const BRAND_PROMISE = 'Find the problem. Coordinate the fix. Verify the result.'

/** Canonical company definition — the one sentence every surface (site, blog, llms.txt) inherits. */
export const DEFAULT_DESCRIPTION =
  'Edviro connects building signals, work orders, assets, schedules, field teams, projects, and budgets so school facilities teams can detect problems, coordinate the response, and verify that the work succeeded.'

export const DEFAULT_OG_IMAGE = '/og-image.png'
export const LOGO_PATH = '/logo-icon.png'

export const CONTACT_EMAIL = 'founders@edviroenergy.com'
export const BLOG_URL = 'https://blog.edviroenergy.com'

/**
 * Canonical solution destinations. Nav, footer, llms.txt, the sitemap and the
 * blog all link to these, so keep the paths stable. The school energy page is
 * the ranking energy-management URL — never repoint it.
 */
export const SCHOOL_ENERGY_PATH = '/solutions/schools/'
export const FACILITIES_OPS_PATH = '/solutions/school-facilities-operations/'
export const WORK_ORDERS_PATH = '/school-work-order-software/'
export const CMMS_PATH = '/cmms-for-schools/'
export const ASSETS_PATH = '/school-asset-management-software/'
export const CAPITAL_PLANNING_PATH = '/capital-planning/'
export const MV_PATH = '/measurement-and-verification/'
export const FAQ_PATH = '/faq/'
export const ABOUT_PATH = '/about/'

/**
 * Public profiles, used for the footer links and Organization `sameAs`. The X
 * account is Hursh's personal profile rather than a brand account, so swap it
 * here if Edviro ever gets its own.
 */
export const LINKEDIN_URL = 'https://www.linkedin.com/company/edviro/'
export const X_URL = 'https://x.com/hursheybar2'
export const X_HANDLE = '@hursheybar2'
export const SOCIAL_URLS = [LINKEDIN_URL, X_URL]

/**
 * Every "Book a demo" CTA points at this page, which explains the demo and
 * pricing.
 */
export const BOOK_DEMO_PATH = '/book-a-demo/'

/**
 * Scheduling links point here rather than straight at BOOKING_URL, so changing
 * schedulers (or the Calendly event) is a one-line edit below. Only the
 * redirect page reads BOOKING_URL.
 */
export const DEMO_REDIRECT_PATH = '/demo/'
export const BOOKING_URL = 'https://calendly.com/tanuj-edviroenergy/30min'

/**
 * Where Calendly returns invitees after they book. Reaching it is the confirmed
 * booking, so the ad conversions below are reported from this page rather than
 * from the click that opened the scheduler.
 */
export const DEMO_BOOKED_PATH = '/demo-booked/'

/**
 * Public IUSD community sustainability dashboard demo (edviro-community-template,
 * deployed as an assets-only Cloudflare Worker). The landing page only forwards
 * this vanity path via the generated Netlify _redirects file.
 */
export const IUSD_DEMO_PATH = '/iusd-sustainability-demo'
export const IUSD_DEMO_URL = 'https://edviro-community-iusd.tanujsiripurapu.workers.dev'

/*
 * Ad conversions. All three tags load from index.html, and all three are reported
 * from DEMO_BOOKED_PATH so they count confirmed bookings. The IDs are unchanged
 * from when they fired on the click that opened the scheduler, so the Google
 * action's history mixes both definitions — but it is now the page-load
 * conversion for the booking confirmation, matching how it is reported here.
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

/**
 * Canonical URL for a route path — always the trailing-slash form. Pages are
 * prerendered as directory indexes (ssgOptions.dirStyle 'nested'), and Netlify
 * 301s the slashless variant to the slashed one, so only the slashed URL
 * serves a 200. Redirects, rel="canonical", and the sitemap are all
 * canonicalization signals to Google and must agree on this one URL.
 */
export function canonicalUrl(path: string): string {
  if (!path || path === '/') return `${SITE_URL}/`
  const clean = path.replace(/\/+$/, '')
  return absoluteUrl(`${clean}/`)
}
