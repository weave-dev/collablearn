import { pb } from '$lib/modules/authentication'
import { writable } from 'svelte/store'
import JoyToast from '$lib/components/Advanced/Toast/JoyToast.svelte'
import type { Route } from '$lib/routes'

export const App = {
	getAuthStore: () => pb.authStore,
	isLoading: writable(false),
	toast: writable<JoyToast>(),
	currentRoute: writable<Route | undefined>(undefined),
} as const
