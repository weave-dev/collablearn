import { redirectIfNot } from '$lib/composables/usePermission'

import { App } from '$lib/modules/app'
import { authStore, pb, user, type User } from '$lib/modules/authentication'
import { getUserRoles } from '$lib/modules/user-roles'
import { tryit } from 'radash'

export const load = async () => {
	// @TODO: intercept route request
	// redirect to login page if not authenticated
	const auth = App.getAuthStore()
	redirectIfNot(auth.isValid)

	authStore.set(pb.authStore)
	user.set(pb.authStore.model as User)
	const [getUserRolesErr] = await tryit(getUserRoles)(auth.model as User)

	return { getUserRolesErr }
}
