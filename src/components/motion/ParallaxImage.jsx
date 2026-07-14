import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * An <img> that drifts vertically as the page scrolls past it, for a subtle
 * cinematic depth effect. The wrapper is padded beyond its own bounds so the
 * drifting image never reveals a gap at the edges.
 */
export default function ParallaxImage({ src, alt, range = 8, className = '', imgClassName = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`])

  return (
    <div ref={ref} className={`relative h-full w-full overflow-hidden ${className}`}>
      <motion.div className="absolute -top-[12%] -bottom-[12%] inset-x-0" style={{ y }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  )
}
