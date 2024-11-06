<script lang="ts">
	import { BorderRounded } from '$lib/types/Round'
	import type { HTMLTextareaAttributes } from 'svelte/elements'
	import { TextAreaSize, TextAreaVariant } from './types'

	export let attributes: HTMLTextareaAttributes | undefined = undefined
	export let containerClass: string = ''
	export let placeholder: string = 'Type here'
	export let size: TextAreaSize = TextAreaSize.MD
	export let variant: TextAreaVariant = TextAreaVariant.NEUTRAL
	export let bordered = false
	export let value: string | number | undefined = undefined
	export let name: string | undefined = undefined
	export let rounded: BorderRounded = BorderRounded.MD

	let clazz = ''
	let textareaClass = ''
	export { clazz as class }

	$: {
		let buildClass = ''

		if (bordered) {
			buildClass += ' textarea-bordered'
		}

		textareaClass = `textarea relative
			focus-within:outline-none focus-within:border-primary focus-within:border-2 transition-colors duration-200
			${variant} ${size} ${rounded} ${buildClass} ${clazz}`
	}
</script>

{#if $$slots['label-top'] || $$slots['label-bottom']}
	<label class={`form-control ${containerClass}`}>
		<div class="label">
			<slot name="label-top" />
		</div>
		<textarea {...attributes} {name} {placeholder} class={textareaClass} bind:value />
		<div class="label">
			<slot name="label-bottom" />
		</div>
	</label>
{:else}
	<textarea {...attributes} {name} {placeholder} class={textareaClass} bind:value />
{/if}
