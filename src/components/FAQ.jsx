import Reveal from './motion/Reveal.jsx'
import GhostNumeral from './GhostNumeral.jsx'
import Accordion from './Accordion.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function FAQ() {
  const { t } = useLanguage()
  const faq = t.faq
  return (
    <section id="faq" className="relative overflow-hidden py-28 md:py-[160px]">
      <GhostNumeral className="-top-6 left-1/2 -translate-x-1/2 text-[220px] xl:text-[280px]">06</GhostNumeral>

      <div className="relative mx-auto max-w-[680px] px-6 text-center md:px-12">
        <Reveal>
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.08em] text-deep-nile">{faq.index}</div>
          <h2 className="font-serif text-[clamp(44px,6vw,80px)] font-normal leading-[1.08] tracking-[-0.015em]">
            {faq.titleLead}
            <em className="italic text-sahara-gold">{faq.titleEm}</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[42ch] text-base leading-relaxed text-night-soft">{faq.intro}</p>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="relative mx-auto mt-16 max-w-[760px] px-6 text-start md:mt-20 md:px-12">
        <Accordion items={faq.items} />
      </Reveal>
    </section>
  )
}
