/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F8FAFC',
          dark: '#0F172A',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1E293B',
          darkMuted: '#334155',
          darkBorder: '#475569',
        },
        brand: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          DEFAULT: '#0F172A',
          hover: '#1E293B',
          dark: '#020617',
        },
        accent: {
          DEFAULT: '#0284C7',
          hover: '#0369A1',
          light: '#E0F2FE',
          dark: '#075985',
        },
        ink: {
          DEFAULT: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
          light: '#F1F5F9',
          border: '#E2E8F0',
        },
        // Dedicated Pastel + Vibrant Semantic Tokens
        mint: {
          DEFAULT: '#059669',
          light: '#ECFDF5',
          border: '#A7F3D0',
          dark: '#047857',
          vibrant: '#10B981',
        },
        sky: {
          DEFAULT: '#0284C7',
          light: '#F0F9FF',
          border: '#BAE6FD',
          dark: '#0369A1',
          vibrant: '#0EA5E9',
        },
        lavender: {
          DEFAULT: '#7C3AED',
          light: '#FAF5FF',
          border: '#DDD6FE',
          dark: '#6D28D9',
          vibrant: '#8B5CF6',
        },
        butter: {
          DEFAULT: '#D97706',
          light: '#FFFBEB',
          border: '#FDE68A',
          dark: '#B45309',
          vibrant: '#F59E0B',
        },
        peach: {
          DEFAULT: '#EA580C',
          light: '#FFF7ED',
          border: '#FFEDD5',
          dark: '#C2410C',
          vibrant: '#F97316',
        },
        rose: {
          DEFAULT: '#E11D48',
          light: '#FFF1F2',
          border: '#FECDD3',
          dark: '#BE123C',
          vibrant: '#F43F5E',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        gujarati: ['"Noto Sans Gujarati"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'soft': '0 2px 8px -1px rgba(15, 23, 42, 0.06)',
        'soft-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.3)',
        'elevated': '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.03)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
    },
  },
  plugins: [],
}
