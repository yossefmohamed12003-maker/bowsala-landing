/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'nile-mist': '#A8C5CF',
        'lapis-mist': '#7AA1AF',
        'deep-nile': '#5A7B79',
        'desert-night': '#3A3321',
        'sahara-gold': '#9F7B4B',
        limestone: '#D5D4C5',
        'gold-deep': '#87623A',
        'gold-soft': '#C9A877',
        'gold-wash': '#EFE6D6',
        'night-soft': '#5A5239',
        'nile-deep': '#466060',
        paper: '#F4F1E8',
        'paper-pure': '#FBFAF5',
        'line-soft': '#C7C4B4',
        'line-faint': '#E2DECF',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['"Schibsted Grotesk"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        wordmark: '0.18em',
        overline: '0.26em',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(58,51,33,0.06)',
        sm: '0 2px 8px rgba(58,51,33,0.08)',
        md: '0 8px 24px rgba(58,51,33,0.10)',
        lg: '0 18px 50px rgba(58,51,33,0.14)',
        image: '0 20px 60px rgba(58,51,33,0.22)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        'in-out': 'cubic-bezier(0.45, 0, 0.2, 1)',
      },
      transitionDuration: {
        fast: '140ms',
        base: '240ms',
        slow: '460ms',
      },
      maxWidth: {
        container: '1280px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 300ms ease-out both',
        riseIn: 'riseIn 500ms cubic-bezier(0.22,0.61,0.36,1) both',
      },
    },
  },
  plugins: [],
}
