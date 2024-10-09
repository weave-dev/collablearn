<script lang="ts">
	import { ToastVariant } from '$lib/components/Advanced/Toast/types'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { App } from '$lib/modules/app/stores.js'
	import { authService } from '$lib/modules/authentication'
	import { userIs } from '$lib/modules/user-roles/composables/index.js'
	import { Roles } from '$lib/modules/user-roles/types.js'
	import { translate } from '$lib/translations'
	import { onMount } from 'svelte'

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

	const { signOutUser } = authService()
</script>

<JoyContainer class="bg-primary/50 w-full">
	<h1>Welcome</h1>
	<button on:click={signOutUser}>Sign out</button>
</JoyContainer>
