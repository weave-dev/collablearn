import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'Poppins', ...defaultTheme.fontFamily.sans],
			},
		},
	},

	plugins: [
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('daisyui'),
	],

	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#3eaef8',
					secondary: '#f1c40e',
					accent: '#ff7566',
					neutral: '#070708',
          base: '#f9f9fb',
					'base-100': '#fafbff',
					info: '#38bdf8',
					success: '#a3e635',
					warning: '#eab308',
					error: '#ef4444',
				},
			},
		],
	},
}
