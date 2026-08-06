/// <reference types="vite/client" />

interface Window {
  /**
   * Invitee email set on /demo-booked from the Calendly redirect. The Google
   * Ads enhanced-conversions setup reads this global by name ("JavaScript
   * variables" method).
   */
  edviroBookingEmail?: string
  /** Defined by the Google tag snippet in index.html. */
  gtag?: (command: string, event: string, params?: Record<string, unknown>) => void
  /** Defined by the LinkedIn Insight Tag snippet in index.html. */
  lintrk?: (command: string, data?: Record<string, unknown>) => void
  /** Defined by the OpenAI Ads pixel snippet in index.html. */
  oaiq?: (
    command: string,
    event: string,
    data?: Record<string, unknown>,
    options?: Record<string, unknown>,
  ) => void
}
