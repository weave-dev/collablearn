import type { RecordAuthResponse } from 'pocketbase'
import { authStore, pb, user } from './stores'
import { tick } from 'svelte'
import type { User, NewUserDTO } from './types'
import { App } from '$lib/routes/types'
import { goto } from '$app/navigation'
import { createService } from '$lib/modules/base/services'
import { tryit } from 'radash'

const collection = 'users'
const service = createService<User>(collection)

const signInUser = async (
	username: string,
	password: string
): Promise<[Error?, RecordAuthResponse<User>?]> => {
	let result: RecordAuthResponse<User>

	try {
		result = await pb.collection(collection).authWithPassword<User>(username, password)
		authStore.set(pb.authStore)
		user.set(pb.authStore.model as User)

		return [undefined, result]
	} catch (error: unknown) {
		return [error as Error, undefined]
	}
}

const signInUserWithLRN = async (
	lrn: string,
	password: string
): Promise<[Error?, RecordAuthResponse<User>?]> => {
	const [err, result] = await tryit(service.first)(`lrn = "${lrn}"`)

	if (err || !result) {
		return [err, result]
	}

	return signInUser(result.username, password)
}

const registerUser = async (payload: NewUserDTO): Promise<[Error?, User?]> => {
	const [err, result] = await tryit(service.create)(payload)
	return [err, result]
}

const signOutUser = async () => {
	return new Promise((resolve) => {
		pb.authStore.clear()
		tick().then(() => resolve(goto(App.INDEX, { replaceState: true })))
	})
}

export const authService = () => ({
	...service,
	registerUser,
	signInUser,
	signInUserWithLRN,
	signOutUser,
})
