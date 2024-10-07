import type { RecordAuthResponse } from 'pocketbase'
import { pb } from './stores'
import { tick } from 'svelte'
import type { User, UserDTO } from './types'
import { App } from '$lib/routes/types'
import { goto } from '$app/navigation'
import { createService } from '$lib/modules/base/services'
import { tryit } from 'radash'

const collection = 'users'
const service = createService<User>(collection)

const signInUser = (
	username: string,
	password: string
): Promise<RecordAuthResponse<User>> => {
	return new Promise((resolve, reject) => {
		pb.collection('users')
			.authWithPassword<User>(username, password)
			.then((response) => resolve(response))
			.catch((response) => reject({ response }))
	})
}

const registerUser = async (payload: UserDTO): Promise<[Error?, User?]> => {
	const [err, result] = await tryit(service.create)(payload)
	return [err, result]
}

const signOutUser = () => {
	return new Promise((resolve) => {
		pb.authStore.clear()
		tick().then(() => resolve(goto(App.INDEX, { replaceState: true })))
	})
}

export const userService = () => ({
	...service,
	registerUser,
	signInUser,
	signOutUser,
})
