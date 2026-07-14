import Button from './Button.jsx'
import Eyebrow from './Eyebrow.jsx'
import Reveal from './motion/Reveal.jsx'
import GhostNumeral from './GhostNumeral.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { buildWhatsAppLink } from '../utils/whatsapp.js'
import { trackEvent } from '../utils/tracking.js'

export default function Logistics() {
  const { t, dir } = useLanguage()
  const logistics = t.logistics
  const whatsappHref = buildWhatsAppLink(t.whatsapp.message)

  const handleBookClick = () =>
    trackEvent('InitiateCheckout', { value: 1850, currency: 'EGP', content_name: 'Bowsala - July 24th', channel: 'whatsapp' })

  return (
    <section id="book" className="relative overflow-hidden bg-paper py-28 md:py-[160px]">
      <GhostNumeral className="-top-10 start-6 text-[260px] xl:text-[320px]">04</GhostNumeral>

      <div className="relative mx-auto grid max-w-container grid-cols-1 gap-12 px-6 md:grid-cols-[6fr_5fr] md:gap-[90px] md:px-12">
        <Reveal>
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.08em] text-deep-nile">{logistics.index}</div>
          <h2 className="font-serif text-[clamp(44px,6vw,80px)] font-normal leading-[1.08] tracking-[-0.015em]">
            {logistics.titleLead}
            <em className="italic text-sahara-gold">{logistics.titleEm}</em>
          </h2>

          <div className="mt-14 border-t border-desert-night">
            {logistics.pickups.map((stop) => (
              <div
                key={stop.place}
                className="group grid grid-cols-[1fr_auto] items-baseline border-b border-line-soft py-[22px] transition-colors duration-base hover:border-sahara-gold"
              >
                <span className="font-serif text-2xl transition-transform duration-base ease-out ltr:group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">
                  {stop.place}
                </span>
                <span className="font-mono text-base tracking-[0.06em] text-deep-nile">{stop.time}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          x={dir === 'rtl' ? -32 : 32}
          y={0}
          delay={0.1}
          className="rounded bg-desert-night p-10 text-limestone md:sticky md:top-[120px] md:self-start md:p-14"
        >
          <Eyebrow className="text-gold-soft">{logistics.price.eyebrow}</Eyebrow>
          <div className="mt-[22px] mb-1 font-mono text-[clamp(56px,6vw,84px)] leading-[1.05] text-paper-pure">
            {logistics.price.amount}{' '}
            <span className="text-[0.38em] tracking-[0.1em] text-gold-soft">{logistics.price.currency}</span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5 flex-none">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sahara-gold opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-soft" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold-soft">
              {logistics.price.scarcity.label}
            </span>
          </div>

          <p className="mt-4 text-sm text-limestone/70">{logistics.price.sub}</p>
          <div className="mt-8 rounded border border-dashed border-gold-soft p-5 text-sm leading-relaxed text-gold-soft">
            <strong className="font-semibold text-paper-pure">{logistics.price.crewLead}</strong> {logistics.price.crew}
          </div>
          <Button
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 w-full justify-center"
            onClick={handleBookClick}
          >
            {logistics.price.cta.label}
          </Button>
          <p className="mt-3 text-center text-xs text-limestone/55">{logistics.price.scarcity.sub}</p>
        </Reveal>
      </div>
    </section>
  )
}
