import { writable } from 'svelte/store'
import type { User } from '$lib/modules/authentication'

export const accounts = writable<User[]>()
