import type { UnplugIconName } from '$lib/components/Base/Icon/Unplug'
import { writable } from 'svelte/store'
import {
	Home,
	RouteGroup,
	type CatchUpFridayRouteValues,
	type GuildRouteValues,
	type HomeRouteValues,
	type LearningModuleRouteValues,
	type LessonMaterialRouteValues,
	type ProjectRouteValues,
	type RouteGroupValues,
	type TaskRouteValues,
} from './types'
import { get } from 'svelte/store'
import { loadTranslations, translate } from '$lib/translations'

import { useGuildRoutes } from './guilds'
import { useProjectRoutes } from './projects'
import { useLearningModuleRoutes } from './learning-modules'
import { useTaskRoutes } from './tasks'
import { useCatchUpFridayRoutes } from './catchup-fridays'
import { useLessonMaterialRoutes } from './lesson-materials'

const $translate = get(translate)
await loadTranslations('en', '/')

const { guildRoutes } = useGuildRoutes(translate)
const { projectRoutes } = useProjectRoutes(translate)
const { LEARNING_MODULE_ROUTE } = useLearningModuleRoutes(translate)
const { TASK_ROUTE } = useTaskRoutes(translate)
const { CATCH_UP_FRIDAY_ROUTE } = useCatchUpFridayRoutes(translate)
const { LESSON_MATERIAL_ROUTE } = useLessonMaterialRoutes(translate)

export const activeRoute = writable<Route>()

export interface Route {
	path:
		| HomeRouteValues
		| GuildRouteValues
		| ProjectRouteValues
		| LearningModuleRouteValues
		| TaskRouteValues
		| CatchUpFridayRouteValues
		| LessonMaterialRouteValues
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

	TASK_ROUTE,
	...get(guildRoutes),
	...get(projectRoutes),
	LEARNING_MODULE_ROUTE,
	CATCH_UP_FRIDAY_ROUTE,
	LESSON_MATERIAL_ROUTE,
])
