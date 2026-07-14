import Button from './Button.jsx'
import Logo from './Logo.jsx'
import Reveal from './motion/Reveal.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { buildWhatsAppLink } from '../utils/whatsapp.js'
import { trackEvent } from '../utils/tracking.js'

export default function Footer() {
  const { t } = useLanguage()
  const footer = t.footer
  const whatsappHref = buildWhatsAppLink(t.whatsapp.message)

  return (
    <footer className="relative overflow-hidden bg-desert-night py-28 text-limestone md:py-[170px] md:pb-[60px]">
      <div
        className="pointer-events-none absolute inset-0 bg-no-repeat opacity-[0.05]"
        style={{ backgroundImage: 'url(/images/trip-texture.svg)', backgroundSize: '420px' }}
      />

      <div className="relative mx-auto max-w-container px-6 text-center md:px-12">
        <Reveal>
          <span className="font-sans text-xs font-semibold uppercase tracking-overline text-gold-soft">
            {footer.eyebrow}
          </span>
          <h2 className="mx-auto mt-7 max-w-[14ch] font-serif text-[clamp(48px,7vw,104px)] font-normal leading-[1.06] text-paper-pure">
            {footer.titleLead}
            <em className="italic text-gold-soft">{footer.titleEm}</em>
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-wrap justify-center gap-4">
          {footer.actions.map((action) => (
            <Button
              key={action.label}
              href={action.channel === 'whatsapp' ? whatsappHref : action.href}
              variant={action.variant}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent(action.channel === 'whatsapp' ? 'InitiateCheckout' : 'Contact', {
                  channel: action.channel,
                  cta: 'footer',
                })
              }
            >
              {action.label}
            </Button>
          ))}
        </Reveal>

        <div className="mt-9 font-mono text-sm tracking-[0.08em] text-limestone/65">{footer.contact}</div>

        <div className="mt-28 flex flex-wrap items-center justify-between gap-5 border-t border-white/[0.28] pt-8 text-[13px] text-limestone/55">
          <Logo size="small" wordClassName="text-limestone" />
          <span>{footer.tagline}</span>
          <span>{footer.copyright}</span>
        </div>
      </div>
    </footer>
  )
}
