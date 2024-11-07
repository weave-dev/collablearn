<script lang="ts">
	import {
		FontWeight,
		TextColor,
		TextSize,
		TextTag,
	} from '$lib/components/Base/Text/types'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { Border, BorderRounded, ContainerPadding, Justify } from '$lib/types'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button'
	import JoyModal from '$lib/components/Advanced/Modal/JoyModal.svelte'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import JoyTextArea from '$lib/components/Base/Input/JoyTextArea.svelte'
	import { AlignItems } from '$lib/types/AlignItems'
	import { superForm } from 'sveltekit-superforms'
	import type { PageData } from './$types'
	import { App } from '$lib/modules/app'
	import { discussionService, discussions} from '$lib/modules/guilds/discussions'
	import { ToastVariant } from '$lib/components/Advanced/Toast/types'
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	const { toast } = App

	const guildId = $page.params.id;


	const { createDiscussion, loadDiscussions } = discussionService()

	let isOpenModal = false

	const openModal = () => {
		isOpenModal = !isOpenModal
	}

	export let data: PageData

	onMount(async () => {
		const err = await loadDiscussions()

		if (err) {
			$toast.fire({ message: err.message, variant: ToastVariant.ERROR })
		}
	})
	const { form, enhance, errors, constraints } = superForm(data.discussionValidSchema, {
		dataType: 'json',
		SPA: true,
		resetForm: false,
		validators: data.discussionValidator,
		onUpdate: async ({ form }) => {
			if (!form.valid) return

			const err = await createDiscussion(form.data.title, form.data.content, guildId)

			if (err) {
				return $toast.fire({ message: err.message, variant: ToastVariant.ERROR })
			}
		},
	})
</script>

<JoyContainer
	rounded={BorderRounded.LG}
	col={true}
	class="w-full border border-primary bg-gray-200 p-2 shadow-lg shadow-black flex flex-col gap-2"
>
	<JoyText color={TextColor.PRIMARY} size={TextSize.SM} weight={FontWeight.BOLD}
		>Discussion</JoyText
	>
	<form use:enhance method="POST" class="w-full flex flex-col gap-2">
		<JoyInput name="title" bind:value={$form.title} placeholder="title" class="min-w-full" />
		<span
			class="first-letter:capitalize text-error text-sm select-none"
			class:text-transparent={!$errors.title}
		>
			{$errors.title}
		</span>
		<JoyTextArea name="content" bind:value={$form.content} placeholder="content..." class="w-full border " />
		<span
			class="first-letter:capitalize text-error text-sm select-none"
			class:text-transparent={!$errors.content}
		>
			{$errors.content}
		</span>
		<JoyContainer justify={Justify.END}>
			<JoyButton type="submit" variant={ButtonVariant.PRIMARY} size={ButtonSize.MD}
				>Add Discussion</JoyButton
			>
		</JoyContainer>
	</form>
</JoyContainer>


{#each $discussions as discussion (discussion.id)}
	<JoyContainer
	border={Border.XXS}
	rounded={BorderRounded.LG}
	padding={ContainerPadding.SM}
	class="w-[58rem] bg-white shadow-lg shadow-black flex flex-col gap-2"
>
	<JoyContainer class="border-b border-gray-600 w-full">
		<JoyText tag={'h1'}>{discussion.title}</JoyText>
	</JoyContainer>
	<JoyText tag={'p'}>
		{discussion.content}
	</JoyText>
	<JoyContainer class="flex flex-wrap gap-2">
		<JoyText class="border rounded-lg p-2 text-xs">Like</JoyText>
		<JoyText class="border rounded-lg p-2 text-xs">Comment</JoyText>
	</JoyContainer>
</JoyContainer>
{/each}



