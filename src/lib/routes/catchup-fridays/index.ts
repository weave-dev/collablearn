import { get, writable } from 'svelte/store'
import type { Route } from '..'
import { CatchUpFriday, RouteGroup } from '../types'
import { translate } from '$lib/translations'

export const useCatchUpFridayRoutes = (t: typeof translate) => {
	const $translate = get(t)

	const CATCH_UP_FRIDAY_ROUTE: Route = {
		path: CatchUpFriday.INDEX,
		icon: 'baseline-dashboard',
		isShown: true,
		label: $translate('common.routes.catchUpFridays'),
		group: RouteGroup.LESSON_ACTIVITIES,
	}

	const catchUpFridayRoutes = writable<Route[]>([CATCH_UP_FRIDAY_ROUTE])

	return {
		CATCH_UP_FRIDAY_ROUTE,
		catchUpFridayRoutes,
	}
}
