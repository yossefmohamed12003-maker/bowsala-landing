import Reveal from './motion/Reveal.jsx'
import GhostNumeral from './GhostNumeral.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Logistics() {
  const { t } = useLanguage()
  const logistics = t.logistics

  return (
    <section id="logistics" className="relative overflow-hidden bg-paper py-28 md:py-[160px]">
      <GhostNumeral className="-top-10 start-6 text-[260px] xl:text-[320px]">05</GhostNumeral>

      <div className="relative mx-auto max-w-container px-6 md:px-12">
        <Reveal className="mb-14 max-w-[640px] md:mb-16">
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.08em] text-deep-nile">{logistics.index}</div>
          <h2 className="font-serif text-[clamp(44px,6vw,80px)] font-normal leading-[1.08] tracking-[-0.015em]">
            {logistics.titleLead}
            <em className="italic text-sahara-gold">{logistics.titleEm}</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {logistics.pickups.map((stop, i) => (
            <Reveal key={stop.place} delay={(i % 2) * 0.08} y={20}>
              <div className="group flex items-baseline justify-between gap-4 rounded border border-line-soft bg-paper-pure px-7 py-6 transition-colors duration-base ease-out hover:border-sahara-gold">
                <span className="font-serif text-2xl transition-transform duration-base ease-out ltr:group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">
                  {stop.place}
                </span>
                <span className="font-mono text-base tracking-[0.06em] text-deep-nile">{stop.time}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
