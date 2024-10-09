<script lang="ts">
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
</script>

<div id="shell" class="relative overflow-hidden">
	<JoyContainer col class="w-screen h-screen overflow-hidden relative">
		<slot />
	</JoyContainer>
</div>
