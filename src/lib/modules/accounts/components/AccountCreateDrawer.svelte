<script lang="ts">
	import { page } from '$app/stores'
	import JoySliderDrawer from '$lib/components/Advanced/Drawer/JoySliderDrawer.svelte'
	import { writable } from 'svelte/store'

	let isLoading = false
	let isShown = writable(false)
	let moduleLabel = 'Accounts'
	let modeLabel = 'Create New Account'

	$: $isShown = Boolean($page.state.accountsCreateDrawer?.isOpen)
</script>

<JoySliderDrawer
	id="account-create-slider"
	{isLoading}
	{isShown}
	{modeLabel}
	{moduleLabel}
></JoySliderDrawer>
