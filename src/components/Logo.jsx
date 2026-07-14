export default function Logo({ size = 'default', wordClassName = 'text-paper-pure' }) {
  const isSmall = size === 'small'
  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/images/compass-logo.png"
        alt="Bowsala compass"
        className={isSmall ? 'h-[22px] w-[22px]' : 'h-[30px] w-[30px]'}
      />
      <span className={`font-serif tracking-wordmark ${isSmall ? 'text-sm' : 'text-[17px]'} ${wordClassName}`}>
        BOWSALA
      </span>
    </div>
  )
}
