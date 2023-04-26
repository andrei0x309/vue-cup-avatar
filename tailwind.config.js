/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')


export default {
	darkMode: 'class',
	mode: 'jit',
	prefix: 'twvac-',
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			...colors,
			gray: {
				...colors.gray as Record<string, string>,
				700: '#ffffff19',
				800: '#191919',
				900: '#131313',
			},
		},
		boxShadow: {
			toolbar: '0 4px 16px 0 rgba(0,0,0,.6)',
		},
		scale: {
			flip: '-1',
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
	],
  }