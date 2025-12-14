/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1976D2',
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#2196F3',
          600: '#1976D2',
          700: '#1565C0',
          800: '#0D47A1',
          900: '#0A3D91',
        },
        success: {
          DEFAULT: '#4CAF50',
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        gold: {
          DEFAULT: '#FFD700',
          50: '#FFFEF7',
          100: '#FFFAEB',
          200: '#FFF4C2',
          300: '#FFED99',
          400: '#FFE770',
          500: '#FFD700',
          600: '#D4AF00',
          700: '#AA8900',
          800: '#806600',
          900: '#554400',
        },
        module: {
          gmail: '#FF7043',
          search: '#42A5F5',
          maps: '#26A69A',
          safety: '#EF5350',
          smartphone: '#FFEB3B',
          tools: '#AB47BC',
        },
      },
      fontSize: {
        'senior-xs': ['1rem', { lineHeight: '1.5rem' }],
        'senior-sm': ['1.125rem', { lineHeight: '1.75rem' }],
        'senior-base': ['1.25rem', { lineHeight: '1.875rem' }],
        'senior-lg': ['1.5rem', { lineHeight: '2rem' }],
        'senior-xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'senior-2xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        'touch': '44px', // Minimum touch target size for seniors
      },
    },
  },
  plugins: [],
}
