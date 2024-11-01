<script lang="ts">
	import { Border, BorderColor } from '$lib/types/Border'
	import { ContainerGap } from '$lib/types/Gap'
	import { ContainerPadding } from '$lib/types/Padding'
	import { BorderRounded } from '$lib/types/Round'
	import { Shadow } from '$lib/types/Shadow'
	import { GridCols, GridRows, type GridColsValues, type GridRowsValues } from './types'

	let clazz: string = ''

	export let padding: ContainerPadding = ContainerPadding.NONE
	export let gap: ContainerGap = ContainerGap.XS
	export let rounded: BorderRounded = BorderRounded.NONE
	export let border: Border = Border.NONE
	export let borderColor: BorderColor = BorderColor.BASE_300
	export let shadow: Shadow = Shadow.NONE
	export let cols: GridColsValues = GridCols[6]
	export let rows: GridRowsValues = GridRows.NONE
	// eslint-disable-next-line no-undef
	export let tag: keyof HTMLElementTagNameMap = 'div'

	export { clazz as class }

	let divClass = 'grid '
	$: {
		divClass = `${divClass} ${cols} ${rows} ${padding} ${gap}
			${border} ${borderColor} ${rounded} ${shadow} ${clazz}`
	}
</script>

<svelte:element this={tag} class={divClass}>
	<slot />
</svelte:element>
