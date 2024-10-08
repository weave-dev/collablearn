import { pb } from '$lib/modules/authentication'
import { writable } from 'svelte/store'
import JoyToast from '$lib/components/Advanced/Toast/JoyToast.svelte'

export const App = {
	getAuthStore: () => pb.authStore,
	isLoading: writable(false),
	toast: writable<JoyToast>(),
} as const
