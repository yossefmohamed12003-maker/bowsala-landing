import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Reveal from './motion/Reveal.jsx'
import GhostNumeral from './GhostNumeral.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const TILT_SPRING = { stiffness: 260, damping: 20, mass: 0.6 }

function Card({ num, title, body, note, delay }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, TILT_SPRING)
  const rotateY = useSpring(ry, TILT_SPRING)

  const handleMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * 7)
    rx.set(py * -7)
  }

  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <Reveal delay={delay} y={22} className="[perspective:1200px]">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY }}
        className="group flex min-h-[240px] flex-col gap-3.5 rounded border border-line-faint bg-paper-pure p-9 transition-[border-color,box-shadow] duration-slow ease-out hover:border-sahara-gold/40 hover:shadow-lg"
      >
        <div className="font-mono text-[13px] tracking-[0.1em] text-sahara-gold transition-transform duration-slow ease-out ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
          {num}
        </div>
        <h3 className="font-serif text-[32px] font-normal leading-[1.12]">{title}</h3>
        <p className="max-w-[44ch] text-base text-night-soft">{body}</p>
        {note && <div className="mt-auto font-mono text-xs tracking-[0.06em] text-deep-nile">{note}</div>}
      </motion.div>
    </Reveal>
  )
}

export default function Highlights() {
  const { t } = useLanguage()
  const highlights = t.highlights
  return (
    <section id="highlights" className="relative overflow-hidden py-28 md:py-[160px]">
      <GhostNumeral className="-top-10 end-6 text-[260px] xl:text-[320px]">03</GhostNumeral>

      <div className="relative mx-auto max-w-container px-6 md:px-12">
        <Reveal className="mb-16 max-w-[640px] md:mb-20">
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.08em] text-deep-nile">{highlights.index}</div>
          <h2 className="font-serif text-[clamp(44px,6vw,80px)] font-normal leading-[1.08] tracking-[-0.015em]">
            {highlights.titleLead}
            <em className="italic text-sahara-gold">{highlights.titleEm}</em>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {highlights.cards.map((card, i) => (
            <Card key={card.title} {...card} delay={(i % 2) * 0.1} />
          ))}

          <Reveal
            delay={0.15}
            className="flex min-h-0 flex-col gap-3.5 rounded border border-gold-soft bg-gold-wash p-9 transition-all duration-slow ease-out hover:shadow-lg md:col-span-2"
          >
            <div className="font-mono text-[13px] tracking-[0.1em] text-sahara-gold">{highlights.featured.num}</div>
            <h3 className="font-serif text-[32px] font-normal leading-[1.12]">{highlights.featured.title}</h3>
            <p className="max-w-[44ch] text-base text-night-soft">{highlights.featured.body}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
