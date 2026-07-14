// Fires ad-platform conversion events from CTA click handlers. Every call is
// guarded so a missing pixel (dev, ad-blocker, pixel not yet configured)
// never throws — it just silently skips that platform.
//
// `name` should be a standard event name shared across Meta + TikTok:
// 'InitiateCheckout' for booking CTAs, 'Contact' for WhatsApp/Instagram
// hand-offs. GTM always receives the raw event via dataLayer regardless of
// which pixels are present, so container-side triggers can fan out from there.
export function trackEvent(name, meta = {}) {
  if (typeof window === 'undefined') return

  if (typeof window.fbq === 'function') {
    window.fbq('track', name, meta)
  }

  if (window.ttq && typeof window.ttq.track === 'function') {
    window.ttq.track(name, meta)
  }

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'bowsala_cta_click', cta_event: name, ...meta })
}
