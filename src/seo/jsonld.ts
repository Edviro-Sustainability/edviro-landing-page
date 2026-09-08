import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  BRAND_PROMISE,
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
    slogan: BRAND_PROMISE,
    email: CONTACT_EMAIL,
    sameAs: SOCIAL_URLS,
    foundingDate: '2024',
    knowsAbout: [
      'School facilities operations and maintenance',
      'Work order management',
      'Asset management',
      'Preventive maintenance',
      'Energy management',
      'Measurement and verification',
      'Capital planning',
    ],
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

/**
 * The Edviro platform as a software product. The sub-category and feature
 * list describe the whole platform (facilities operations and maintenance),
 * not only the energy-management entry point. Every feature listed here is
 * visibly described on the homepage; keep the two in sync and never add
 * ratings, prices, integrations, or outcomes that are not on the page.
 */
export function softwareApplicationLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Facilities Management and CMMS Software',
    operatingSystem: 'Web',
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { '@id': ORG_ID },
    featureList: [
      'Work orders',
      'Asset management',
      'Inspections',
      'Preventive maintenance',
      'Mobile field workflows',
      'Energy management',
      'Project and budget management',
      'Capital planning',
      'Measurement and verification',
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType:
        'School district facilities, maintenance, and business teams; building owners; construction teams; data center operators',
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
