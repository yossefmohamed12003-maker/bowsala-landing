import Reveal from './motion/Reveal.jsx'
import GhostNumeral from './GhostNumeral.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Manifesto() {
  const { t } = useLanguage()
  const manifesto = t.manifesto
  return (
    <section id="story" className="relative overflow-hidden bg-paper py-28 md:py-[160px]">
      <GhostNumeral className="-top-16 end-6 text-[260px] xl:text-[320px]">01</GhostNumeral>

      <div className="relative mx-auto grid max-w-container grid-cols-1 gap-12 px-6 md:grid-cols-[4fr_7fr] md:gap-20 md:px-12">
        <Reveal className="md:sticky md:top-[120px] md:self-start">
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.08em] text-deep-nile">{manifesto.index}</div>
          <h2 className="font-serif text-[clamp(44px,6vw,80px)] font-normal leading-[1.08] tracking-[-0.015em]">
            {manifesto.titleLead}
            <em className="italic text-sahara-gold">{manifesto.titleEm}</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-serif text-[clamp(26px,3vw,34px)] leading-[1.4] text-desert-night">{manifesto.lede}</p>
          {manifesto.paragraphs.map((p, i) => (
            <p key={i} className="mt-7 text-xl leading-relaxed text-night-soft">
              {p}
            </p>
          ))}

          <div className="mt-14 flex flex-wrap gap-14 border-t border-line-soft pt-8">
            {manifesto.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-mono text-[34px] text-desert-night">{stat.value}</div>
                <div className="mt-1.5 text-[13px] uppercase tracking-[0.06em] text-deep-nile">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
