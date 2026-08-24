import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  CONTACT_EMAIL,
  absoluteUrl,
  canonicalUrl,
  LOGO_PATH,
  SOCIAL_URLS,
} from './site'

export type JsonLd = Record<string, unknown>

const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

/** Edviro as an Organization. Referenced by `@id` from other entities. */
export function organizationLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: 'Edviro',
    url: SITE_URL,
    logo: absoluteUrl(LOGO_PATH),
    description: DEFAULT_DESCRIPTION,
    email: CONTACT_EMAIL,
    sameAs: SOCIAL_URLS,
    foundingDate: '2024',
    founder: [
      { '@type': 'Person', name: 'Hursh', jobTitle: 'Founder & CEO' },
      { '@type': 'Person', name: 'Tanuj', jobTitle: 'Co-founder & CTO' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
      contactType: 'sales',
    },
  }
}

/** The site itself. */
export function websiteLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'en-US',
    publisher: { '@id': ORG_ID },
  }
}

/** The Edviro platform as a software product. */
export function softwareApplicationLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Energy Management Software',
    operatingSystem: 'Web',
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { '@id': ORG_ID },
    audience: {
      '@type': 'BusinessAudience',
      audienceType:
        'Facilities managers, building owners, data center operators, and construction teams',
    },
  }
}

export interface BreadcrumbItem {
  name: string
  path: string
}

export function breadcrumbLd(items: BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  }
}

export interface FaqItem {
  question: string
  answer: string
}

export function faqLd(items: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

/** A WebPage / Service style entity for marketing sub-pages. */
export function serviceLd(opts: {
  name: string
  description: string
  path: string
  serviceType?: string
  areaServed?: string
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.serviceType ?? 'Building energy management',
    description: opts.description,
    url: canonicalUrl(opts.path),
    provider: { '@id': ORG_ID },
    ...(opts.areaServed ? { areaServed: opts.areaServed } : {}),
  }
}
