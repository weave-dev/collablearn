<script lang="ts">
	import { GridFlow, GridType } from "./type"


export let gridType = GridType.COLUMN;
export let gridNumber = 1;
export let flow : GridFlow = GridFlow.ROW

let divClass = 'grid '
	$: {
		
		divClass = `${divClass} ${gridType}${gridNumber} ${flow} gap-2 w-full`
	}
</script>



<div class={divClass}>

    <slot/>

</div>