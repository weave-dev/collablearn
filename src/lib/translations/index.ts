import i18n from 'sveltekit-i18n'

/** @type {import('sveltekit-i18n').Config} */
const config = {
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default,
		},

		{
			locale: 'en',
			key: 'auth',
			loader: async () => (await import('./en/authentication.json')).default,
		},

		{
			locale: 'en',
			key: 'user-roles',
			loader: async () => (await import('./en/user-roles.json')).default,
		},
		{
			locale: 'en',
			key: 'dashboard',
			loader: async () => (await import('./en/dashboard.json')).default,
		},

		{
			locale: 'en',
			key: 'accounts',
			loader: async () => (await import('./en/accounts.json')).default,
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
