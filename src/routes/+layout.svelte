<script lang="ts">
	import '../app.css'
	import JoyShell from '$lib/components/Advanced/Shell/JoyShell.svelte'
	import JoyScreenSize from '$lib/components/Advanced/ScreenSize/JoyScreenSize.svelte'
	import JoyItemLoader from '$lib/components/Advanced/Loader/JoyItemLoader.svelte'
	import { App } from '$lib/modules/app'
	import { ToastVariant } from '$lib/components/Advanced/Toast/types'
	import JoyToast from '$lib/components/Advanced/Toast/JoyToast.svelte'
	const { isLoading, toast } = App

	const handleError = (event: Event) => {
		$toast.fire({
			message: JSON.stringify(event),
			variant: ToastVariant.ERROR,
		})
	}
</script>

<svelte:window on:error={handleError} />
<JoyToast bind:this={$toast} target="shell" />
<JoyShell>
	<JoyItemLoader bind:isLoading={$isLoading} />
	<JoyScreenSize />
	<slot />
</JoyShell>
