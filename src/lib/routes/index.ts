import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
import { writable } from 'svelte/store'
import {
	Home,
	RouteGroup,
	type GuildRouteValues,
	type HomeRouteValues,
	type RouteGroupValues,
} from './types'
import { get } from 'svelte/store'
import { loadTranslations, translate } from '$lib/translations'
import { useGuildRoutes } from './guild'
const $translate = get(translate)
await loadTranslations('en', '/')

const { GUILD_ROUTE } = useGuildRoutes(translate)

export const activeRoute = writable<Route>()

export interface Route {
	path: HomeRouteValues | GuildRouteValues
	icon: UnplugIconName
	class?: string
	isActive?: boolean
	isShown?: boolean
	group?: RouteGroupValues
	label?: string
}

export const routes = writable<Route[]>([
	{
		path: Home.INDEX,
		icon: 'baseline-dashboard',
		label: $translate('common.routes.home'),
		isShown: true,
		group: RouteGroup.MENU,
	},

	GUILD_ROUTE,
])
