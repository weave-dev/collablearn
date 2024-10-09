import { get, writable } from 'svelte/store'
import type { Route } from '..'
import { Guild, RouteGroup } from '../types'
import { translate } from '$lib/translations'

export const useGuildRoutes = (t: typeof translate) => {
	const $translate = get(t)

	const GUILD_ROUTE: Route = {
		path: Guild.INDEX,
		icon: 'people-sharp',
		isShown: true,
		label: $translate('common.routes.guilds'),
		group: RouteGroup.MENU,
	}

	const guildRoutes = writable<Route[]>([
		GUILD_ROUTE,
		// {
		// 	path: .SCHEDULES,
		// 	icon: 'sort-by-time-bold',
		// 	label: 'Schedules',
		// },
	])

	return {
		GUILD_ROUTE,
		guildRoutes,
	}
}
