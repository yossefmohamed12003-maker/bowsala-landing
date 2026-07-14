import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { buildWhatsAppLink } from '../utils/whatsapp.js'
import { trackEvent } from '../utils/tracking.js'

const EASE = [0.22, 0.61, 0.36, 1]

// Mobile-only booking bar — ~90% of ad traffic lands here on a phone, so the
// CTA needs to survive scrolling rather than living only in the hero/footer.
// Appears once the visitor has scrolled past the hero, not immediately on load.
export default function StickyBookingBar() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)
  const whatsappHref = buildWhatsAppLink(t.whatsapp.message)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () =>
    trackEvent('InitiateCheckout', {
      value: 1850,
      currency: 'EGP',
      content_name: 'Bowsala - July 24th',
      channel: 'whatsapp',
      cta: 'sticky',
    })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-desert-night/90 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-1.5">
              <span className="relative mt-1 flex h-1.5 w-1.5 flex-none">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sahara-gold opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-soft" />
              </span>
              <span className="font-mono text-[11px] leading-snug text-gold-soft">{t.stickyCta.scarcity}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="font-mono text-lg text-paper-pure">
                {t.ticket.price.amount} <span className="text-xs text-gold-soft">{t.ticket.price.currency}</span>
              </div>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                className="flex-none whitespace-nowrap rounded-full bg-sahara-gold px-6 py-3 font-sans text-sm font-semibold text-paper-pure transition-transform duration-base ease-out active:scale-[0.96]"
              >
                {t.stickyCta.label}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
