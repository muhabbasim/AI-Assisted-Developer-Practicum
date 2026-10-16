/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium green palette
        primary: {
          DEFAULT: '#183D32',
          dark: '#0F2920',
          light: '#234D3F',
        },
        sage: {
          DEFAULT: '#A8B5A0',
          light: '#BCC9B5',
          dark: '#93A08B',
        },
        warm: {
          DEFAULT: '#F8F8F3',
          ivory: '#EFEFE6',
        },
        lime: {
          DEFAULT: '#C5E86C',
          light: '#D4F08C',
          dark: '#B5D85C',
        },
        text: {
          primary: '#20231F',
          secondary: '#5A5D58',
          tertiary: '#898C87',
        },
        border: {
          DEFAULT: '#E2E4DC',
          light: '#EEEFE8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        DEFAULT: '0.5rem',
        'md': '0.625rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}
