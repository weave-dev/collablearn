<script lang="ts">
	import { ToastVariant } from '$lib/components/Advanced/Toast/types'
	import { App } from '$lib/modules/app/stores.js'
	import { authService } from '$lib/modules/authentication'
	import { userIs } from '$lib/modules/user-roles/composables/index.js'
	import { Roles } from '$lib/modules/user-roles/types.js'
	import { translate } from '$lib/translations'
	import { onMount } from 'svelte'
	const auth = authService()

	export let data
	const { toast } = App

	onMount(() => {
		if (data.getUserRolesErr) {
			$toast.fire({
				message: $translate('user-roles.error.failedToFetch'),
				variant: ToastVariant.ERROR,
			})
		}

		userIs(Roles.ADMIN)
	})
</script>

<h1>Welcome</h1>
<button on:click={auth.signOutUser}>
	{$translate('common.label.signOut')}
</button>
