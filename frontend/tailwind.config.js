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
          dark: '#090D16',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#111827',
          darkMuted: '#1E293B',
          darkBorder: '#334155',
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
          secondary: '#334155',
          muted: '#64748B',
          light: '#F1F5F9',
          border: '#E2E8F0',
        },
        // Backward-compatible semantic tokens with refined, elegant tones
        lavender: {
          DEFAULT: '#0F172A',
          light: '#F1F5F9',
          dark: '#020617',
          hover: '#1E293B',
        },
        mint: {
          DEFAULT: '#059669',
          light: '#ECFDF5',
          dark: '#047857',
        },
        peach: {
          DEFAULT: '#EA580C',
          light: '#FFF7ED',
          dark: '#C2410C',
        },
        sky: {
          DEFAULT: '#0284C7',
          light: '#F0F9FF',
          dark: '#0369A1',
        },
        butter: {
          DEFAULT: '#D97706',
          light: '#FFFBEB',
          dark: '#B45309',
        },
        rose: {
          DEFAULT: '#E11D48',
          light: '#FFF1F2',
          dark: '#BE123C',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        gujarati: ['"Noto Sans Gujarati"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'soft': '0 2px 8px -1px rgba(15, 23, 42, 0.06)',
        'soft-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.6)',
        'elevated': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
        'glow-brand': '0 0 20px -3px rgba(15, 23, 42, 0.25)',
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
