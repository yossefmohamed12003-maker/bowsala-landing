export default function Eyebrow({ children, className = '' }) {
  return (
    <span className={`font-sans text-xs font-semibold uppercase tracking-overline text-sahara-gold ${className}`}>
      {children}
    </span>
  )
}
