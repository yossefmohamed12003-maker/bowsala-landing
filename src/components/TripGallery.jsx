import Reveal from './motion/Reveal.jsx'
import ParallaxImage from './motion/ParallaxImage.jsx'
import GhostNumeral from './GhostNumeral.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function TripGallery() {
  const { t } = useLanguage()
  const trip = t.trip
  return (
    <section id="trip" className="relative overflow-hidden bg-desert-night py-28 text-limestone md:py-[160px]">
      <div
        className="pointer-events-none absolute inset-0 bg-no-repeat opacity-[0.07]"
        style={{ backgroundImage: 'url(/images/trip-texture.svg)', backgroundSize: '720px', backgroundPosition: '108% -140px' }}
      />
      <GhostNumeral tone="light" className="-top-10 start-6 text-[260px] xl:text-[320px]">02</GhostNumeral>

      <div className="relative mx-auto max-w-container px-6 md:px-12">
        <div className="mb-16 grid grid-cols-1 gap-10 md:mb-20 md:grid-cols-[7fr_4fr] md:items-end md:gap-20">
          <Reveal>
            <div className="mb-[18px] font-mono text-[13px] tracking-[0.08em] text-gold-soft">{trip.index}</div>
            <h2 className="font-serif text-[clamp(44px,6vw,80px)] font-normal leading-[1.08] tracking-[-0.015em] text-paper-pure">
              {trip.titleLead}
              <em className="italic text-gold-soft">{trip.titleEm}</em>
            </h2>
            <p className="mt-6 max-w-[46ch] text-xl leading-relaxed text-limestone/80">{trip.vibe}</p>
          </Reveal>
          <Reveal delay={0.1} className="font-mono text-sm leading-[2] tracking-[0.08em] text-gold-soft md:text-end">
            {trip.date.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </Reveal>
        </div>

        <div className="grid auto-rows-[160px] grid-cols-12 gap-3.5 md:auto-rows-[210px]">
          {trip.gallery.map((item, i) => (
            <Reveal
              key={item.key}
              as="figure"
              delay={(i % 3) * 0.08}
              y={20}
              className={`group relative overflow-hidden rounded ${item.span}`}
            >
              <ParallaxImage
                src={item.img}
                alt={item.alt}
                range={7}
                className="h-full w-full"
                imgClassName="transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.08]"
              />
              <figcaption
                className="absolute bottom-3.5 start-4 font-mono text-xs uppercase tracking-[0.1em] text-paper-pure"
                style={{ textShadow: '0 1px 8px rgba(58,51,33,0.6)' }}
              >
                {item.caption}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
