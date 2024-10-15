<script lang="ts">
	import { page } from '$app/stores'
	import { ToastVariant } from '$lib/components/Advanced/Toast/types'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { accountsService } from '$lib/modules/accounts'
	import { App } from '$lib/modules/app'
	import { onMount } from 'svelte'
	const { listUserAccounts } = accountsService()
	const { toast } = App

	onMount(async () => {
		const err = await listUserAccounts()

		if (err) {
			$toast.fire({ message: err.message, variant: ToastVariant.ERROR })
		}
	})
</script>

<JoyContainer class="bg-primary/50 w-full">
	<h1>{$page.url.pathname}</h1>
</JoyContainer>
