import Button from './Button.jsx'
import Eyebrow from './Eyebrow.jsx'
import Reveal from './motion/Reveal.jsx'
import GhostNumeral from './GhostNumeral.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { buildWhatsAppLink } from '../utils/whatsapp.js'
import { trackEvent } from '../utils/tracking.js'

export default function TicketCard() {
  const { t } = useLanguage()
  const ticket = t.ticket
  const whatsappHref = buildWhatsAppLink(t.whatsapp.message)

  const handleBookClick = () =>
    trackEvent('InitiateCheckout', { value: 1850, currency: 'EGP', content_name: 'Bowsala - July 24th', channel: 'whatsapp' })

  return (
    <section id="book" className="relative overflow-hidden bg-paper py-28 md:py-[160px]">
      <GhostNumeral className="-top-10 start-6 text-[260px] xl:text-[320px]">04</GhostNumeral>

      <div className="relative mx-auto max-w-container px-6 md:px-12">
        <Reveal className="mx-auto mb-14 max-w-[560px] text-center md:mb-16">
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.08em] text-deep-nile">{ticket.index}</div>
          <h2 className="font-serif text-[clamp(44px,6vw,80px)] font-normal leading-[1.08] tracking-[-0.015em]">
            {ticket.titleLead}
            <em className="italic text-sahara-gold">{ticket.titleEm}</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto max-w-[560px] rounded bg-desert-night p-10 text-limestone md:p-14">
          <Eyebrow className="text-gold-soft">{ticket.price.eyebrow}</Eyebrow>
          <div className="mt-[22px] mb-1 font-mono text-[clamp(56px,6vw,84px)] leading-[1.05] text-paper-pure">
            {ticket.price.amount}{' '}
            <span className="text-[0.38em] tracking-[0.1em] text-gold-soft">{ticket.price.currency}</span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5 flex-none">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sahara-gold opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-soft" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold-soft">
              {ticket.price.scarcity.label}
            </span>
          </div>

          <p className="mt-4 text-sm text-limestone/70">{ticket.price.sub}</p>
          <div className="mt-8 rounded border border-dashed border-gold-soft p-5 text-sm leading-relaxed text-gold-soft">
            <strong className="font-semibold text-paper-pure">{ticket.price.crewLead}</strong> {ticket.price.crew}
          </div>
          <Button
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-full justify-center"
            onClick={handleBookClick}
          >
            {ticket.price.cta.label}
          </Button>
          <p className="mt-4 text-center text-xs text-gold-soft/80">{ticket.price.trustSignal}</p>
          <p className="mt-1.5 text-center text-xs text-limestone/55">{ticket.price.scarcity.sub}</p>
        </Reveal>
      </div>
    </section>
  )
}
