import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo.jsx'
import Button from './Button.jsx'
import LanguageToggle from './LanguageToggle.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { trackEvent } from '../utils/tracking.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()
  const nav = t.nav

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const handleCtaClick = () => trackEvent('ClickButton', { cta: 'nav' })

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-desert-night/55 to-transparent px-6 py-4 md:px-12 md:py-5"
    >
      <a href="#top" aria-label="Bowsala home">
        <Logo />
      </a>

      <div className="hidden items-center gap-8 md:flex">
        {nav.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group relative font-sans text-sm font-medium text-paper-pure/90 transition-colors duration-base hover:text-paper-pure"
          >
            {link.label}
            <span className="absolute -bottom-1 start-0 h-px w-0 bg-gold-soft transition-all duration-base ease-out group-hover:w-full" />
          </a>
        ))}
        <LanguageToggle />
        <Button href={nav.cta.href} variant="ghost" className="px-6 py-2.5 text-sm" onClick={handleCtaClick}>
          {nav.cta.label}
        </Button>
      </div>

      <div className="flex items-center gap-4 md:hidden">
        <LanguageToggle />
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
        >
          <span className={`h-px w-6 bg-paper-pure transition-all duration-base ease-out ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-paper-pure transition-all duration-base ease-out ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-9 bg-desert-night transition-opacity duration-slow ease-in-out md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {nav.links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${80 + i * 60}ms` : '0ms' }}
            className={`font-serif text-3xl text-paper-pure transition-all duration-slow ease-out ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
          >
            {link.label}
          </a>
        ))}
        <div
          className={`mt-4 transition-all duration-slow ease-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
          style={{ transitionDelay: open ? `${80 + nav.links.length * 60}ms` : '0ms' }}
        >
          <Button
            href={nav.cta.href}
            variant="gold"
            onClick={() => {
              setOpen(false)
              handleCtaClick()
            }}
          >
            {nav.cta.label}
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
