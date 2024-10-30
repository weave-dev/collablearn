<script lang="ts">
	import { ButtonSize } from '$lib/components/Base/Button/types';
	
	import JoyModal from '$lib/components/Advanced/Modal/JoyModal.svelte';
	import { FontWeight, TextColor, TextSize } from '$lib/components/Base/Text/types'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { page } from '$app/stores'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { TextTag } from '$lib/components/Base/Text/types'
	import {
		Border,
		BorderColor,
		BorderRounded,
		ContainerGap,
		ContainerPadding,
		Justify,
	} from '$lib/types'
	import { ButtonVariant } from '$lib/components/Base/Button'
	import { AlignItems } from '$lib/types/AlignItems'
	import { onMount } from 'svelte'
	import { guilds, guildService } from '$lib/modules/guilds'
	import { App } from '$lib/modules/app'
	import { ToastVariant } from '$lib/components/Advanced/Toast/types'
	import { type NewGuildDTO } from '$lib/modules/guilds/types'
	import { InputVariant } from '$lib/components/Base/Input/types'
	import JoyTextArea from '$lib/components/Base/Input/JoyTextArea.svelte'
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms'
	import JoyGridContainer from '$lib/modules/guilds/components/Grid/JoyGridContainer.svelte'
	const { loadGuilds } = guildService()
	const { toast } = App

	
	export let data : PageData;

	const {createGuild} = guildService()

	
	

	onMount(async () => {
		const err = await loadGuilds()

		if (err) {
			$toast.fire({ message: err.message, variant: ToastVariant.ERROR })
		}
	})


	let isOpenModal = false;



	const openModal = () => {
		isOpenModal = !isOpenModal
	}
	


	const {form, enhance, errors, constraints } = superForm(data.guildValidSchema, {
		dataType : 'json',
		SPA : true,
		resetForm : false,
		validators : data.guildValidator,
		onUpdate: async ({ form}) => {
			if(!form.valid) return;

		

			
			const err = await createGuild(form.data.name, form.data.description)
		
			if (err) {
				return $toast.fire({ message: err.message, variant: ToastVariant.ERROR })
			}

		}
	})

</script>


<JoyContainer
	class="w-full h-screen overflow-y-auto"
	col={true}
	padding={ContainerPadding.XS}
>

<JoyContainer justify={Justify.BETWEEN} alignItems={AlignItems.CENTER} class="w-full">
		<JoyInput placeholder="search..." />
		<JoyContainer gap={ContainerGap.XXS}>
			<JoyButton on:click={openModal} variant={ButtonVariant.PRIMARY}>Create</JoyButton>
			<JoyButton variant={ButtonVariant.GHOST}>Refresh</JoyButton>
		</JoyContainer>
	</JoyContainer>

	<!-- <div class="grid grid-cols-3 grid-flow-row gap-2 w-full"> -->
	 <JoyGridContainer gridNumber="3" >
		{#each $guilds as guild (guild.id)}
		<JoyContainer
			border={Border.XXS}
			borderColor={BorderColor.NEUTRAL}
			padding={ContainerPadding.XS}
			rounded={BorderRounded.LG}
			alignItems={AlignItems.CENTER}
			class="w-full hover:scale-105 duration-700 hover:shadow-lg hover:shadow-gray-300"
		>
			<div class="bg-gray-500 aspect-square rounded-lg h-16"></div>
			<JoyContainer col={true} gap={ContainerGap.XXS}>
				<JoyText tag={TextTag.H1} weight={FontWeight.BOLD} size={TextSize.LG}
					>{ guild.name }</JoyText
				>
				<JoyText tag={TextTag.PARA} size={TextSize.XS} color={TextColor.NEUTRAL}
					>{ guild.expand?.owner_id.username }</JoyText
				>
				<JoyText tag={TextTag.PARA} size={TextSize.SM}>69 members</JoyText>
			</JoyContainer>
		</JoyContainer>
	{/each} 

	 </JoyGridContainer>
	


	<!-- </div> -->
	<JoyModal isShown={isOpenModal}>
		<form  method="POST" use:enhance class="w-full">
			<JoyText tag={TextTag.H1} weight={FontWeight.BOLD} size={TextSize.LG} color={TextColor.PRIMARY}>Create Guild</JoyText>
			<JoyContainer col={true} class="w-full">

				<JoyInput bind:value={$form.name} name="name" placeholder="Guild Name"  class="min-w-full"/>
				<span
					class="first-letter:capitalize text-error text-sm select-none"
					class:text-transparent={!$errors.name}
				>
					{$errors.name}
				</span>
				<JoyTextArea bind:value={$form.description} name="description" placeholder="descriptions" class="w-full h-32">

				</JoyTextArea>
				<span
					class="first-letter:capitalize text-error text-sm select-none"
					class:text-transparent={!$errors.description}
				>
					{$errors.description}
				</span>

			
			</JoyContainer>


			<JoyButton type="submit" variant={ButtonVariant.PRIMARY} size={ButtonSize.MD}>Submit</JoyButton>
			<JoyButton on:click={openModal} variant={ButtonVariant.SECONDARY} size={ButtonSize.MD}>Close</JoyButton>
		</form>
		
	</JoyModal>
</JoyContainer>


