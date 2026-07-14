import { motion } from 'framer-motion'

const EASE = [0.22, 0.61, 0.36, 1]

/**
 * Scroll-triggered fade-up reveal. Wraps any block of content; fires once
 * when it enters the viewport, never re-triggers on scroll back up.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 28,
  x = 0,
  duration = 0.85,
  amount = 0.25,
  className = '',
}) {
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
