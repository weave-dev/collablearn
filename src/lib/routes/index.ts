import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
import { writable } from 'svelte/store'
import { Home, type GuildRouteValues, type HomeRouteValues } from './types'
import { GUILD_ROUTE } from './guild'

export const activeRoute = writable<Route>()

export interface Route {
	path: HomeRouteValues | GuildRouteValues
	icon: UnplugIconName
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
