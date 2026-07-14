import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Button from './Button.jsx'
import Eyebrow from './Eyebrow.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { trackEvent } from '../utils/tracking.js'

const EASE = [0.22, 0.61, 0.36, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

const headline = {
  hidden: { opacity: 0, y: 46, filter: 'blur(14px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: EASE } },
}

export default function Hero() {
  const heroRef = useRef(null)
  const { t } = useLanguage()
  const hero = t.hero
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <header
      ref={heroRef}
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden text-paper-pure"
    >
      <div className="absolute inset-x-0 -top-[8%] -bottom-[8%]">
        <motion.div
          className="h-full w-full bg-cover bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero.webp)', backgroundPosition: 'center 35%', y: bgY }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(58,51,33,0.82) 0%, rgba(58,51,33,0.25) 45%, rgba(58,51,33,0.12) 100%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-container px-6 pb-16 md:px-12 md:pb-[72px]"
      >
        <motion.div variants={item} className="mb-6 flex items-center gap-4">
          <span className="h-px w-14 bg-gold-soft" />
          <Eyebrow className="text-gold-soft">{hero.kicker}</Eyebrow>
        </motion.div>

        <motion.h1
          variants={headline}
          className="max-w-[13ch] font-serif text-[clamp(60px,11vw,168px)] font-normal leading-[1.0] tracking-[-0.02em]"
        >
          {hero.titleLead}
          <em className="text-gold-soft not-italic italic">{hero.titleEm}</em>
        </motion.h1>

        <motion.p variants={item} className="mt-8 max-w-[42ch] text-xl leading-relaxed text-paper-pure/90">
          {hero.sub}
        </motion.p>

        <motion.div variants={item} className="mt-11 flex flex-wrap items-center gap-7">
          <Button href={hero.cta.href} onClick={() => trackEvent('ClickButton', { cta: 'hero' })}>
            {hero.cta.label}
          </Button>
          <span className="font-mono text-[13px] tracking-[0.08em] text-paper-pure/75">{hero.meta}</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper-pure/60">{hero.scroll}</span>
        <span className="h-10 w-px bg-gradient-to-b from-paper-pure/60 to-transparent" />
      </motion.div>
    </header>
  )
}
