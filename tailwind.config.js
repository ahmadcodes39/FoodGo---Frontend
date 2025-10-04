/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orangeBtn: '#f97316',
        yellowBtn: '#facc15',
        blueBtn: '#3b82f6',
        greenBtn: '#22c55e',
        redBtn: '#ef4444',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
}
