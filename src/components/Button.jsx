import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const styles = {
  gold: {
    base: 'bg-sahara-gold text-paper-pure',
    fill: 'bg-desert-night',
    text: 'group-hover:text-gold-soft',
  },
  ghost: {
    base: 'bg-transparent text-paper-pure border border-white/40',
    fill: 'bg-gold-soft',
    text: 'group-hover:text-desert-night',
  },
}

const SPRING = { stiffness: 300, damping: 20, mass: 0.5 }

export default function Button({ href, variant = 'gold', magnetic = true, className = '', style, children, ...props }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING)
  const springY = useSpring(y, SPRING)
  const s = styles[variant] ?? styles.gold

  const handleMouseMove = (e) => {
    if (!magnetic || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY, ...style }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-9 py-4 font-sans text-base font-semibold ${s.base} ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ltr:origin-left rtl:origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${s.fill}`}
      />
      <span className={`relative z-10 transition-colors duration-500 ease-out ${s.text}`}>{children}</span>
    </motion.a>
  )
}
