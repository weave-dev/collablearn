import { get, writable } from 'svelte/store'
import type { Route } from '..'
import { Project, RouteGroup } from '../types'
import { translate } from '$lib/translations'

export const useProjectRoutes = (t: typeof translate) => {
	const $translate = get(t)

	const PROJECT_ROUTE: Route = {
		path: Project.INDEX,
		icon: 'baseline-folder-shared',
		isShown: true,
		label: $translate('common.routes.projects'),
		group: RouteGroup.MENU,
	}

	const projectRoutes = writable<Route[]>([
		PROJECT_ROUTE,
		{
			path: Project.JOINED,
			icon: 'baseline-folder-shared',
			isShown: true,
			label: $translate('common.routes.joinedProjects'),
			group: RouteGroup.MY_TASKS,
		},
	])

	return {
		PROJECT_ROUTE,
		projectRoutes,
	}
}
