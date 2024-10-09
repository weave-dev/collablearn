import { get, writable } from 'svelte/store'
import type { Route } from '..'
import { Task, RouteGroup } from '../types'
import { translate } from '$lib/translations'

export const useTaskRoutes = (t: typeof translate) => {
	const $translate = get(t)

	const TASK_ROUTE: Route = {
		path: Task.INDEX,
		icon: 'baseline-dashboard',
		isShown: true,
		label: $translate('common.routes.recentTasks'),
		group: RouteGroup.MY_TASKS,
	}

	const taskRoutes = writable<Route[]>([
		TASK_ROUTE,
		// {
		// 	path: .SCHEDULES,
		// 	icon: 'sort-by-time-bold',
		// 	label: 'Schedules',
		// },
	])

	return {
		TASK_ROUTE,
		taskRoutes,
	}
}
