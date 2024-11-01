<script lang="ts">
	import { page } from '$app/stores'
	import JoySliderDrawer from '$lib/components/Advanced/Drawer/JoySliderDrawer.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import { GridCols } from '$lib/components/Base/Grid'
	import JoyGrid from '$lib/components/Base/Grid/JoyGrid.svelte'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import JoyTextArea from '$lib/components/Base/Input/JoyTextArea.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { FontWeight, TextSize } from '$lib/components/Base/Text/types'
	import { translate } from '$lib/translations'
	import { ContainerGap, ContainerPadding, Justify } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'
	import { writable } from 'svelte/store'
	import { superForm, type SuperValidated } from 'sveltekit-superforms'
	import type { ValidationAdapter } from 'sveltekit-superforms/adapters'
	import type { AccountDTO } from '../types'

	let isLoading = false
	let isShown = writable(false)
	let moduleLabel = $translate('accounts.label.accounts')
	let modeLabel = $translate('accounts.label.createNewAccount')

	export let validSchema: SuperValidated<AccountDTO, unknown, AccountDTO>
	export let validator: ValidationAdapter<AccountDTO, AccountDTO>

	const { form, enhance, errors, constraints } = superForm(validSchema, {
		dataType: 'json',
		SPA: true,
		resetForm: false,
		validators: validator,
		onUpdate: async ({ form }) => {
			if (!form.valid) return

			isLoading = true
			// @TODO continue account creation
			// const [err] = await signInUser(form.data.username, form.data.password)
			isLoading = false

			// if (err) {
			// 	return toast.fire({ message: err.message, variant: ToastVariant.ERROR })
			// }
		},
	})

	$: $isShown = Boolean($page.state.accountsCreateDrawer?.isOpen)

	let fields = [
		{
			name: 'lrn',
			colSpan: 'col-span-full',
			control: 'text',
		},
		{
			name: 'email',
			colSpan: 'col-span-full',
			control: 'text',
		},
		{
			name: 'firstName',
			colSpan: 'col-span-3',
			control: 'text',
		},
		{
			name: 'middleName',
			colSpan: 'col-span-3',
			control: 'text',
		},
		{
			name: 'lastName',
			colSpan: 'col-span-full',
			control: 'text',
		},
		{
			name: 'address',
			colSpan: 'col-span-full',
			control: 'text',
		},
		{
			name: 'bio',
			colSpan: 'col-span-full',
			control: 'textarea',
		},
	]
</script>

<JoySliderDrawer
	id="account-create-slider"
	{isLoading}
	{isShown}
	{modeLabel}
	{moduleLabel}
>
	<JoyContainer
		padding={ContainerPadding.NONE}
		class="w-full px-8 py-0"
		justify={Justify.BETWEEN}
		alignItems={AlignItems.CENTER}
	>
		<form action="" class="w-full">
			<JoyGrid cols={GridCols[6]} gap={ContainerGap.XS} class="w-full">
				{#each fields as field}
					{#if field.control == 'text'}
						<JoyInput bordered class={`${field.colSpan} bg-white`}>
							<svelte:fragment slot="labeled-l">
								<JoyText weight={FontWeight.BOLD} size={TextSize.SM}>
									{$translate(`accounts.fields.${field.name}`)}
								</JoyText>
							</svelte:fragment>
						</JoyInput>
					{:else if field.control == 'textarea'}
						<JoyTextArea
							bordered
							class={`${field.colSpan} bg-white resize-none h-[200px]`}
						/>
					{/if}
				{/each}

				<JoyButton
					class="col-span-full"
					size={ButtonSize.MD}
					variant={ButtonVariant.PRIMARY}
				>
					{$translate('common.label.submit')}
				</JoyButton>
			</JoyGrid>
		</form>
	</JoyContainer>
</JoySliderDrawer>
