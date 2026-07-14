import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function Row({ words }) {
  return (
    <div className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-7 font-serif text-2xl italic leading-none text-desert-night/80 md:px-10 md:text-4xl">
            {w}
          </span>
          <span className="h-1.5 w-1.5 flex-none rotate-45 bg-sahara-gold" />
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  const { t, dir } = useLanguage()
  const words = t.marquee
  const animateX = dir === 'rtl' ? ['0%', '50%'] : ['0%', '-50%']

  return (
    <div className="relative overflow-hidden border-y border-line-soft py-8">
      <motion.div
        className="flex w-max"
        animate={{ x: animateX }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        <Row words={words} />
        <Row words={words} />
      </motion.div>
    </div>
  )
}
