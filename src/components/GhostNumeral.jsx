import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function GhostNumeral({ children, tone = 'dark', range = 22, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-range, range])
  const color = tone === 'light' ? 'text-limestone/[0.06]' : 'text-desert-night/[0.05]'

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      style={{ y }}
      className={`pointer-events-none absolute hidden select-none font-serif leading-none lg:block ${color} ${className}`}
    >
      {children}
    </motion.span>
  )
}
