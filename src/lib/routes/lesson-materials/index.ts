import { get, writable } from 'svelte/store'
import type { Route } from '..'
import { LessonMaterial, RouteGroup } from '../types'
import { translate } from '$lib/translations'

export const useLessonMaterialRoutes = (t: typeof translate) => {
	const $translate = get(t)

	const LESSON_MATERIAL_ROUTE: Route = {
		path: LessonMaterial.INDEX,
		icon: 'baseline-book',
		isShown: true,
		label: $translate('common.routes.lessonMaterials'),
		group: RouteGroup.LESSON_ACTIVITIES,
	}

	const lessonMaterialRoutes = writable<Route[]>([LESSON_MATERIAL_ROUTE])

	return {
		LESSON_MATERIAL_ROUTE,
		lessonMaterialRoutes,
	}
}
