import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
import type { IconName } from '$lib/components/Base/Icon/types'
import { writable } from 'svelte/store'
import { Home, type GuildRouteVlues, type HomeRouteValeus } from './types'
import { GUILD_ROUTE } from './guild'

export const activeRoute = writable<Route>()

export interface Route {
	path: HomeRouteValeus | GuildRouteVlues
	icon: IconName | UnplugIconName
	class?: string
	isActive?: boolean
	isShown?: boolean
	label?: string
}

export const routes = writable<Route[]>([
	{
		path: Home.INDEX,
		icon: 'home',
		label: 'Home',
	},

	GUILD_ROUTE,
])
