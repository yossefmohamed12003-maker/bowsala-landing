import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './motion/Reveal.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function HouseRules() {
  const { t } = useLanguage()
  const rules = t.rules
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const textureY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      id="rules"
      ref={sectionRef}
      className="relative overflow-hidden bg-desert-night py-28 text-limestone md:py-[190px]"
    >
      <motion.div
        className="pointer-events-none absolute -inset-y-[10%] inset-x-0 bg-no-repeat opacity-[0.06]"
        style={{
          backgroundImage: 'url(/images/trip-texture.svg)',
          backgroundSize: '640px',
          backgroundPosition: '-8% 30%',
          y: textureY,
        }}
      />

      <div className="relative mx-auto max-w-container px-6 md:px-12">
        <Reveal className="mb-20 max-w-[18ch] md:mb-28">
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.08em] text-gold-soft">{rules.index}</div>
          <h2 className="font-serif text-[clamp(48px,8vw,108px)] font-normal leading-[1.02] tracking-[-0.02em] text-paper-pure">
            {rules.titleLead}
            <em className="italic text-gold-soft">{rules.titleEm}</em>
          </h2>
        </Reveal>

        <div>
          {rules.items.map((rule, i) => (
            <Reveal
              key={rule.code}
              delay={i * 0.1}
              y={26}
              className={`group border-t border-white/15 py-10 md:py-14 ${i === rules.items.length - 1 ? 'border-b' : ''}`}
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-12">
                <span className="font-mono text-sm tracking-[0.12em] text-gold-soft md:w-20 md:flex-none">
                  {rule.code}
                </span>
                <h3 className="font-serif text-[clamp(32px,4.5vw,56px)] font-normal leading-[1.05] text-paper-pure transition-transform duration-slow ease-out ltr:group-hover:translate-x-2 rtl:group-hover:-translate-x-2 md:w-[40%] md:flex-none">
                  {rule.title}
                </h3>
                <p className="max-w-[46ch] text-base leading-relaxed text-limestone/65">{rule.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
