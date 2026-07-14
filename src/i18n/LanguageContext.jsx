import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { en, ar } from './content.js'

const DICTS = { en, ar }
const STORAGE_KEY = 'bowsala-lang'
const LanguageContext = createContext(null)

let arabicFontsInjected = false

// Arabic is the default experience, so index.html already includes a static
// preconnect + stylesheet link for Cairo/Tajawal. This only exists as a
// defensive fallback (e.g. if that markup is ever removed) — it checks for
// the existing tag first so it never double-fetches the same stylesheet.
function injectArabicFonts() {
  if (arabicFontsInjected || typeof document === 'undefined') return
  if (document.querySelector('link[href*="fonts.googleapis.com/css2?family=Cairo"]')) {
    arabicFontsInjected = true
    return
  }
  arabicFontsInjected = true

  const preconnectGoogle = document.createElement('link')
  preconnectGoogle.rel = 'preconnect'
  preconnectGoogle.href = 'https://fonts.googleapis.com'

  const preconnectGstatic = document.createElement('link')
  preconnectGstatic.rel = 'preconnect'
  preconnectGstatic.href = 'https://fonts.gstatic.com'
  preconnectGstatic.crossOrigin = 'anonymous'

  const stylesheet = document.createElement('link')
  stylesheet.rel = 'stylesheet'
  stylesheet.href =
    'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Tajawal:wght@400;500;700&display=swap'

  document.head.append(preconnectGoogle, preconnectGstatic, stylesheet)
}

// Arabic is the default for all new visitors — only an explicit prior choice
// of English (stored from a previous visit) overrides it.
function readInitialLang() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ar'
  } catch {
    return 'ar'
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    if (lang === 'ar') injectArabicFonts()
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* private-browsing storage denial is a no-op */
    }
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      t: DICTS[lang],
      toggleLang: () => setLang((current) => (current === 'ar' ? 'en' : 'ar')),
      setLang,
    }),
    [lang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
