import { createService } from '$lib/modules/base/services'
import type { NewUserDTO, User } from '$lib/modules/authentication'
import { tryit } from 'radash'
import { accounts } from './stores'

const collection = 'users'
const service = createService<User>(collection)

const listUserAccounts = async (page = 1, limit = 30) => {
	const [err, result] = await tryit(service.list)(page, limit, {
		sort: '-created',
	})

	if (err) return err

	accounts.set(result.items)
}

const createUserAccount = (newUser: NewUserDTO) => {
	return service.create(newUser)
}

const updateUserAccount = (id: string, userAccount: Partial<User>) => {
	const data: Partial<User> = {
		...userAccount,
	}

	return service.update(id, data)
}

export const accountsService = () => ({
	...service,
	createUserAccount,
	updateUserAccount,
	listUserAccounts,
})
