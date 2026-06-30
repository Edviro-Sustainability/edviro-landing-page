/**
 * Site-wide constants used to build canonical URLs, OpenGraph/Twitter tags,
 * and JSON-LD structured data. Keep the production host in sync with the
 * deployed domain so canonical and social URLs resolve correctly.
 */
export const SITE_URL = 'https://edviroenergy.com'
export const SITE_NAME = 'Edviro'
export const SITE_TAGLINE = 'Autonomous building energy management'

export const DEFAULT_DESCRIPTION =
  'Edviro connects your meters, controls, and utility data, watches every building 24/7, catches energy waste as it starts, fixes it, and proves the savings with audit-grade M&V.'

export const DEFAULT_OG_IMAGE = '/og-image.png'
export const LOGO_PATH = '/logo-icon.png'

export const CONTACT_EMAIL = 'founders@edviroenergy.com'
export const CALENDLY_URL = 'https://calendly.com/hursh-edviroenergy/new-meeting'

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
