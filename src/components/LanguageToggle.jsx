import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function LanguageToggle({ className = '' }) {
  const { lang, toggleLang } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={lang === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
      className={`flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] transition-colors duration-base ease-out hover:border-gold-soft/60 ${className}`}
    >
      <span className={lang === 'en' ? 'text-gold-soft' : 'text-paper-pure/45'}>EN</span>
      <span className="text-paper-pure/25">|</span>
      <span className={lang === 'ar' ? 'text-gold-soft' : 'text-paper-pure/45'}>ع</span>
    </button>
  )
}
