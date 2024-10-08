import { env } from '$env/dynamic/public'
import Pocketbase, { BaseAuthStore } from 'pocketbase'
import { writable } from 'svelte/store'
import type { User } from './types'
import { FormMode, type FormModeValue } from './components/types'

export const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL)
export const user = writable<User>()
export const authStore = writable<BaseAuthStore>()
export const formMode = writable<FormModeValue>(FormMode.USER_LOGIN)
