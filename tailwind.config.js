/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        notion: {
          bg: '#ffffff',
          'bg-secondary': '#f7f7f5',
          'bg-hover': '#efefef',
          border: '#e3e3e1',
          text: '#191919',
          'text-secondary': '#6b6b6b',
          'text-muted': '#9b9a97',
          accent: '#2eaadc',
        },
      },
    },
  },
  plugins: [],
}
