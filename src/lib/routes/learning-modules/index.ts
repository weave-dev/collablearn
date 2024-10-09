import { get, writable } from 'svelte/store'
import type { Route } from '..'
import { LearningModule, RouteGroup } from '../types'
import { translate } from '$lib/translations'

export const useLearningModuleRoutes = (t: typeof translate) => {
	const $translate = get(t)

	const LEARNING_MODULE_ROUTE: Route = {
		path: LearningModule.INDEX,
		icon: 'baseline-book',
		isShown: true,
		label: $translate('common.routes.learningModules'),
		group: RouteGroup.MENU,
	}

	const learningModuleRoutes = writable<Route[]>([LEARNING_MODULE_ROUTE])

	return {
		LEARNING_MODULE_ROUTE,
		learningModuleRoutes,
	}
}
