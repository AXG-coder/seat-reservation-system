/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#141414",
        Secondary: '#1c1c1c',
        color: '#e5e7eb'
      },
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}

