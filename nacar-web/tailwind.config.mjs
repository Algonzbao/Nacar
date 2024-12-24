import animations from '@midudev/tailwind-animations'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
		  fontFamily: {
			sans: ['Karla', 'sans-serif'],
		  },
		  colors: {
			primary: '#A4C8C1',
			primaryHover: '#429BE3',
			rosa: '#e19889',
			azul: '#50a3ab',
			arena: '#d2b686',
			trial: '#48E5AF',
			hoverRosa: '#E664C3',
		  },
		},
	  },
	plugins: [
		animations
	],
}
