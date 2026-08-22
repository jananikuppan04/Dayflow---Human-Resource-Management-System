/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0F19',
          navy: '#0F172A',
          sidebar: '#0F172A',
          card: '#1E293B',
          blue: '#2563EB',
          'blue-hover': '#1D4ED8',
          'blue-light': '#EFF6FF',
          accent: '#3B82F6',
          purple: '#6366F1',
          bg: '#F8FAFC',
          border: '#E2E8F0',
          muted: '#64748B',
          darkText: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        glow: '0 0 20px -5px rgba(37, 99, 235, 0.25)',
      }
    },
  },
  plugins: [],
}
