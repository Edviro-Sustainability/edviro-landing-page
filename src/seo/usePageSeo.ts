import { useHead } from '@unhead/vue'
import {
  SITE_NAME,
  SITE_TAGLINE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  X_HANDLE,
  absoluteUrl,
  canonicalUrl,
} from './site'
import type { JsonLd } from './jsonld'

export interface PageSeoOptions {
  /** Page-specific title (the site name is appended via the template). */
  title: string
  description?: string
  /** Root-relative path of the current route, e.g. `/faq/`. */
  path: string
  /** Root-relative or absolute social image URL. */
  image?: string
  /** OpenGraph type, defaults to `website`. */
  type?: string
  /**
   * Title template. Defaults to `%s · Edviro`. Pass `null` to use the title
   * verbatim (useful for the home page brand title).
   */
  titleTemplate?: string | null
  /** Structured data objects rendered as <script type="application/ld+json">. */
  jsonLd?: JsonLd[]
  /** Set to true to keep a page out of search indexes. */
  noindex?: boolean
}

/**
 * Sets title, meta description, canonical link, OpenGraph, Twitter cards, and
 * optional JSON-LD for the current page. Works during SSG (prerendered into the
 * static HTML) and on the client during SPA navigation.
 */
export function usePageSeo(opts: PageSeoOptions): void {
  const description = opts.description ?? DEFAULT_DESCRIPTION
  const url = canonicalUrl(opts.path)
  const image = absoluteUrl(opts.image ?? DEFAULT_OG_IMAGE)
  const type = opts.type ?? 'website'
  const titleTemplate =
    opts.titleTemplate === undefined ? `%s · ${SITE_NAME}` : opts.titleTemplate

  useHead({
    title: opts.title,
    titleTemplate,
    link: [{ rel: 'canonical', href: url }],
    meta: [
      { name: 'description', content: description },
      ...(opts.noindex
        ? [{ name: 'robots', content: 'noindex, nofollow' }]
        : [{ name: 'robots', content: 'index, follow, max-image-preview:large' }]),

      { property: 'og:type', content: type },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: opts.title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${SITE_NAME} — ${SITE_TAGLINE}` },
      { property: 'og:locale', content: 'en_US' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: X_HANDLE },
      { name: 'twitter:title', content: opts.title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    script: (opts.jsonLd ?? []).map((obj) => ({
      type: 'application/ld+json',
      innerHTML: obj,
    })),
  })
}
