export const ssr = false
export const csr = true

import { loadTranslations } from '$lib/translations'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ url }) => {
	const { pathname } = url

	const initLocale = 'en' // get from cookie, user session, ...

	await loadTranslations(initLocale, pathname) // keep this just before the `return`

	return {}
}
