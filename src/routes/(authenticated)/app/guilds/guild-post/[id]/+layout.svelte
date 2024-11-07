<script lang="ts">
	import { id } from 'framework7/shared/utils.js';
	import { page } from '$app/stores'
	import JoyModal from '$lib/components/Advanced/Modal/JoyModal.svelte'
	import JoyAnchor from '$lib/components/Base/Anchor/JoyAnchor.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { GridCols } from '$lib/components/Base/Grid'
	import JoyGrid from '$lib/components/Base/Grid/JoyGrid.svelte'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import {
		FontWeight,
		TextColor,
		TextSize,
		TextTag,
	} from '$lib/components/Base/Text/types'
	import { Guild } from '$lib/routes/types'
	import { BorderRounded, ContainerGap, ContainerPadding, Justify } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import { onMount } from 'svelte'
	import { guildService } from '$lib/modules/guilds'
	import { writable } from 'svelte/store'
	import type {  Guild as GuildType } from '$lib/modules/guilds/types'

	const {getGuild} = guildService();

	let isOpenModal = false

	const openModal = () => {
		isOpenModal = !isOpenModal
	}

	let guild = {};

	let guildId = $page.params.id;
	
	onMount(async () => {
		guild = {...await getGuild(`id = "${guildId}"`)};
	});
</script>

<JoyContainer col={true} class="w-full max-h-screen overflow-y-auto">
	<!-- svelte-ignore missing-declaration -->

	<JoyContainer
		rounded={BorderRounded.LG}
		col={true}
		class="w-full sticky top-0 bg-base-100"
		padding={ContainerPadding.MD}
	>
		<div class="bg-gray-300 rounded-lg w-full h-32"></div>
		<JoyContainer col={true} class="w-full">
			<JoyContainer
				justify={Justify.BETWEEN}
				alignItems={AlignItems.CENTER}
				class="w-full"
			>
				<JoyContainer col={true}>
					<JoyText
						tag={TextTag.H1}
						class="text-bold"
						color={TextColor.PRIMARY}
						weight={FontWeight.BOLD}
						size={TextSize.XL_4}>{guild?.name}</JoyText
					>
					<JoyText tag={TextTag.PARA} size={TextSize.SM}>Public | 12 members</JoyText>
				</JoyContainer>

				<JoyContainer gap={ContainerGap.XXS}>
					<JoyButton on:click={openModal} variant={ButtonVariant.PRIMARY}
						>+ invite </JoyButton
					>
					<JoyButton variant={ButtonVariant.GHOST}>Join</JoyButton>
				</JoyContainer>
			</JoyContainer>
		</JoyContainer>
		<JoyGrid class="w-full" cols={GridCols[5]} gap={ContainerGap.SM}>
			<JoyAnchor
				variant={ButtonVariant.LINK}
				size={ButtonSize.SM}
				href={`${Guild.GUILD_POST}/${guildId}`}
			>
				<JoyText size={TextSize.SM}>Discussion</JoyText>
			</JoyAnchor>
			<JoyAnchor variant={ButtonVariant.LINK} size={ButtonSize.SM} href={`${Guild.GUILD_POST}/${guildId}/chat-feed`}>
				<JoyText size={TextSize.SM}>Chat Feed</JoyText>
			</JoyAnchor>
			<JoyAnchor variant={ButtonVariant.LINK} size={ButtonSize.SM} href={`${Guild.GUILD_POST}/${guildId}/members`}>
				<JoyText size={TextSize.SM}>Members</JoyText>
			</JoyAnchor>
			<JoyAnchor variant={ButtonVariant.LINK} size={ButtonSize.SM} href={`${Guild.GUILD_POST}/${guildId}/about`}>
				<JoyText size={TextSize.SM}>About</JoyText>
			</JoyAnchor>
			<JoyAnchor
				variant={ButtonVariant.LINK}
				size={ButtonSize.SM}
				href={`${Guild.GUILD_POST}/${guildId}/file-attachments`}
			>
				<JoyText size={TextSize.SM}>File Attachment</JoyText>
			</JoyAnchor>
		</JoyGrid>
	</JoyContainer>

	<slot />

	<JoyModal isShown={isOpenModal}>
		<form method="POST" class="w-full">
			<JoyText
				tag={TextTag.H1}
				weight={FontWeight.BOLD}
				size={TextSize.LG}
				color={TextColor.PRIMARY}>Join Guild</JoyText
			>
			<JoyContainer col={true} class="w-full">
				<!-- svelte-ignore missing-declaration -->
				<JoyInput name="name" placeholder="Guild Name" class="min-w-full" />
				<!-- <span
					class="first-letter:capitalize text-error text-sm select-none"
					class:text-transparent={!$errors.name}
				>
					{$errors.name}
				</span> -->

				<!-- <span
					class="first-letter:capitalize text-error text-sm select-none"
					class:text-transparent={!$errors.description}
				>
					{$errors.description}
				</span> -->
			</JoyContainer>

			<JoyButton type="submit" variant={ButtonVariant.PRIMARY} size={ButtonSize.MD}
				>Submit</JoyButton
			>
			<JoyButton
				on:click={openModal}
				variant={ButtonVariant.SECONDARY}
				size={ButtonSize.MD}>Close</JoyButton
			>
		</form>
	</JoyModal>
</JoyContainer>
