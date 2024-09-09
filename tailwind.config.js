/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'navy': '#17213C',
      'dark-green': '#23856D',
      'olive': '#176552',
      'laurel': '#39603D',
      'dark-gray': '#3C403D',
      'crimson': '#B73225',
      'cerulean': '#004E7C',
      'indigo': '#283747',
      'poppy-red': '#E63946',
      'linoleum-blue': '#457B9D',
      'nile-blue': '#1D3557',
      'mango-orange': '#FF7B47',
      'deep-sea-green': '#0D5C63',
      'yankees-blue': '#17213C',
      'squash-orange': '#FCA311',
      'dark-navy': '#14213D',
      'sunburst': '#FFA62B',
      'pacific-blue': '#00A1C1',
      'sapphire-blue': '#16697A',
    },
    extend: {},
  },
  plugins: [],
}

