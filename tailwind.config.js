/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: 'rgb(var(--rgb-sand) / <alpha-value>)',
          50: 'rgb(var(--rgb-sand-light) / <alpha-value>)',
          100: 'rgb(var(--rgb-sand) / <alpha-value>)',
          200: 'rgb(var(--rgb-sand-dark) / <alpha-value>)',
        },
        sunset: {
          DEFAULT: 'rgb(var(--rgb-sunset) / <alpha-value>)',
          400: 'rgb(var(--rgb-sunset-light) / <alpha-value>)',
          500: 'rgb(var(--rgb-sunset) / <alpha-value>)',
          600: 'rgb(var(--rgb-sunset-dark) / <alpha-value>)',
        },
        coral: 'rgb(var(--rgb-coral) / <alpha-value>)',
        driftwood: {
          DEFAULT: 'rgb(var(--rgb-driftwood) / <alpha-value>)',
          400: 'rgb(var(--rgb-driftwood-light) / <alpha-value>)',
          500: 'rgb(var(--rgb-driftwood) / <alpha-value>)',
        },
        shadow: 'rgb(var(--rgb-shadow) / <alpha-value>)',
        ocean: 'rgb(var(--rgb-ocean) / <alpha-value>)',
        palm: 'rgb(var(--rgb-palm) / <alpha-value>)',
        twilight: 'rgb(var(--rgb-twilight) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '14': ['14px', { lineHeight: '1.6' }],
        '16': ['16px', { lineHeight: '1.6' }],
        '18': ['18px', { lineHeight: '1.5' }],
        '20': ['20px', { lineHeight: '1.4' }],
        '24': ['24px', { lineHeight: '1.3' }],
        '30': ['30px', { lineHeight: '1.2' }],
        '36': ['36px', { lineHeight: '1.15' }],
        '48': ['48px', { lineHeight: '1.1' }],
        '60': ['60px', { lineHeight: '1.05' }],
        '72': ['72px', { lineHeight: '1' }],
      },
      spacing: {
        18: '72px',
        22: '88px',
        30: '120px',
        40: '160px',
      },
      borderRadius: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        soft: 'var(--shadow-md)',
        lifted: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'glow-sunset': 'var(--glow-sunset)',
        'glow-coral': 'var(--glow-coral)',
      },
      transitionTimingFunction: {
        smooth: 'var(--ease-smooth)',
        bounce: 'var(--ease-bounce)',
        wave: 'var(--ease-wave)',
        float: 'var(--ease-float)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
        slower: 'var(--duration-slower)',
      },
    },
  },
  plugins: [],
}
