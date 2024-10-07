import i18n from 'sveltekit-i18n'

/** @type {import('sveltekit-i18n').Config} */
const config = {
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default,
		},
		// Routes specific translations
		// {
		// 	locale: 'en',
		// 	key: 'home',
		// 	routes: ['/'], // you can use regexes as well!
		// 	loader: async () => (await import('./en/home.json')).default,
		// },
	],
}

export const {
	t: translate,
	locale,
	locales,
	loading,
	loadTranslations,
} = new i18n(config)
