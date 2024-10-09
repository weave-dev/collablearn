<script lang="ts">
	import { page } from '$app/stores'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
</script>

<JoyContainer class="bg-primary/50 w-full">
	<h1>{$page.url.pathname}</h1>
</JoyContainer>
