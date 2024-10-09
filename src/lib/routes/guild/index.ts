import { writable } from 'svelte/store'
import type { Route } from '..'
import { Guild } from '../types'

export const GUILD_ROUTE: Route = {
	path: Guild.INDEX,
	icon: 'sparks-solid',
	isShown: true,
	label: 'Guild',
}

export const guildRoutes = writable<Route[]>([
	GUILD_ROUTE,
	// {
	// 	path: .SCHEDULES,
	// 	icon: 'sort-by-time-bold',
	// 	label: 'Schedules',
	// },
])
