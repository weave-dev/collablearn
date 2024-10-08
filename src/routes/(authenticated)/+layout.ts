import { redirectIfNot } from '$lib/composables/usePermission'

import { App } from '$lib/modules/app'

export const load = () => {
	// @TODO: intercept route request
	// redirect to login page if not authenticated
	const auth = App.getAuthStore()
	redirectIfNot(auth.isValid)
}
