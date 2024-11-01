/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['selector', 'class'],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			white: '#ffffff',
			black: '#000000',
			navy: '#17213C',
			'dark-green': '#23856D',
			olive: '#176552',
			laurel: '#39603D',
			'dark-gray': '#3C403D',
			crimson: '#B73225',
			cerulean: '#004E7C',
			indigo: '#283747',
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
			'success-color': '#2DC071',
			'light-gray': '#737373',
			'primary-color': '#23A6F0',
			'secondary-color': '#23856D',
			'alert-color': '#E77C40',
			'danger-color': '#E74040',
			'text-color': '#252B42',
			'gray': '#FAFAFA',

		},
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {},
			maxWidth: {
				'75vw': '75vw', // Custom max-width for 75% of viewport width
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
}

