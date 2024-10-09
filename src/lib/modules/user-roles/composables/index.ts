import type { Role, Roles } from '$lib/modules/user-roles/types'
import { currentRoles } from '$lib/modules/user-roles/stores'
import { get } from 'svelte/store'

export const userIs = (roleName: Roles): boolean => {
	const hasRole = get(currentRoles).findIndex((role: Role) => role.name === roleName)
	return hasRole !== -1
}
