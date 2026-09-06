/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bharat Design System — Core Palette
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF9933', // Government Saffron
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        bharat: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#138808', // India Green
          600: '#15803D',
          700: '#166534',
          800: '#065F46',
          900: '#064E3B',
        },
        gold: {
          300: '#E5C158',
          400: '#D4AF37',
          500: '#C9A227',
          600: '#B08D1E',
        },
        navy: { // Kept for some legacy elements if any
          950: '#080E1A',
          900: '#0F172A',
          800: '#111827',
          700: '#1E293B',
          600: '#334155',
        },
        sandstone: {
          50: '#FFFDF8',
          100: '#F8F4EC',
          200: '#F0E8D8',
          300: '#E5D9C3',
        },
        warmwhite: '#F8FAFC',

        // Semantic aliases (Bharat theme)
        background: '#F8F7F2',
        surface: '#FFFDF8',
        card: '#FFFDF8',
        text: '#0E1A2B',
        primary: '#FF9933',
        success: '#138808',
        warning: '#FF9933',
        critical: '#D32F2F',
        info: '#2563EB',
        secondary: '#6B7280',
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        '20': 'repeat(20, minmax(0, 1fr))',
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      borderRadius: {
        'card': '16px',
        'btn': '12px',
        'pill': '9999px',
      },
      boxShadow: {
        'card-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
        'card-md': '0 4px 16px -4px rgba(0, 0, 0, 0.08)',
        'card-lg': '0 8px 32px -8px rgba(0, 0, 0, 0.1)',
        'card-glow': '0 0 24px -4px rgba(255, 153, 51, 0.15)',
        'saffron-sm': '0 0 12px rgba(255, 153, 51, 0.1)',
        'saffron-md': '0 0 24px rgba(255, 153, 51, 0.15)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.12)',
        'portal-card': '0 4px 24px -6px rgba(0, 0, 0, 0.08)',
        'portal-hover': '0 8px 32px -8px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'chakra-spin': 'chakraSpin 3s linear infinite',
        'saffron-pulse': 'saffronPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 153, 51, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 153, 51, 0.4)' },
        },
        chakraSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        saffronPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
