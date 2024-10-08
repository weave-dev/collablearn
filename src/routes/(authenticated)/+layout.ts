import { redirectIfNot } from '$lib/composables/usePermission'

import { App } from '$lib/modules/app'
import type { User } from '$lib/modules/authentication'
import { getUserRoles } from '$lib/modules/user-roles'
import { tryit } from 'radash'

export const load = async () => {
	// @TODO: intercept route request
	// redirect to login page if not authenticated
	const auth = App.getAuthStore()
	redirectIfNot(auth.isValid)

	const [getUserRolesErr] = await tryit(getUserRoles)(auth.model as User)

	return { getUserRolesErr }
}
