import { pb, type User } from '$lib/modules/authentication'
import { currentRoles, currentUserRole } from './stores'
import type { UserRole } from './types'

const collection = 'role_user'

export const getUserRoles = (user: User): Promise<UserRole> => {
	return new Promise((resolve, reject) => {
		pb.collection<UserRole>(collection)
			.getFirstListItem(`user_id = "${user.id}"`, {
				expand: 'roles',
			})
			.then((response) => {
				currentUserRole.set(response)
				currentRoles.set(response.expand.roles)
				resolve(response)
			})
			.catch((response) => reject(response))
	})
}
