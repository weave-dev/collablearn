import { writable } from 'svelte/store'
import type { Route } from '..'
import { Guild } from '../types'

export const GUILD_ROUTE: Route = {
	path: Guild.INDEX,
	icon: 'people',
	isShown: true,
	label: 'Guild',
}

export const attendanceRoutes = writable<Route[]>([
	GUILD_ROUTE,
	// {
	// 	path: .SCHEDULES,
	// 	icon: 'sort-by-time-bold',
	// 	label: 'Schedules',
	// },
])
