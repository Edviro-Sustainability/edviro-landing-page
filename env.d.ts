/// <reference types="vite/client" />

interface Window {
  /** Defined by the Google tag snippet in index.html. */
  gtag?: (command: string, event: string, params?: Record<string, unknown>) => void
}
