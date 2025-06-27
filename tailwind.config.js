/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            900: '#1a1a1a',
            800: '#2d2d2d',
            700: '#404040'
          },
          accent: {
            600: '#ea580c',
            500: '#f97316',
            400: '#fb923c'
          },
          neutral: {
            100: '#fafafa',
            200: '#f5f5f5',
            300: '#e5e5e5',
            500: '#737373'
          },
          // 職種別カラー
          graphic: '#10b981',
          illustration: '#8b5cf6',
          branding: '#f59e0b'
        },
        fontFamily: {
          sans: ['Noto Sans JP', 'Inter', 'sans-serif']
        },
        animation: {
          'fade-in': 'fadeIn 0.6s ease-in-out',
          'slide-up': 'slideUp 0.4s ease-out'
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' }
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
          }
        }
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  };