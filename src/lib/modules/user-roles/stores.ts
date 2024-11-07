import { writable } from 'svelte/store'
import type { Role, UserRole } from './types'

export const currentUserRole = writable<UserRole>()
export const currentRoles = writable<Array<Role>>([])
