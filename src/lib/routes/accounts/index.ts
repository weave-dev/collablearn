import { get, writable } from 'svelte/store'
import type { Route } from '..'
import { Account, RouteGroup } from '../types'
import { translate } from '$lib/translations'

export const useAccountRoutes = (t: typeof translate) => {
	const $translate = get(t)

	const ACCOUNT_ROUTE: Route = {
		path: Account.INDEX,
		icon: 'people-sharp',
		isShown: true,
		label: $translate('common.routes.accountsManagement'),
		group: RouteGroup.ADMIN,
	}

	const accountRoutes = writable<Route[]>([ACCOUNT_ROUTE])

	return {
		ACCOUNT_ROUTE,
		accountRoutes,
	}
}
