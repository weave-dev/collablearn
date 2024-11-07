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
	import { writable, type Writable } from 'svelte/store'
	import SuperDebug, { superForm, type SuperValidated } from 'sveltekit-superforms'
	import type { ValidationAdapter } from 'sveltekit-superforms/adapters'
	import type { Account, AccountDTO } from '../types'
	import { App } from '$lib/modules/app'
	import { ToastVariant } from '$lib/components/Advanced/Toast/types'
	import { accountsService } from '../services'

	const { toast } = App

	const { getUserAccount, updateUserAccount } = accountsService()

	let isLoading = false
	let isShown = writable(false)
	let moduleLabel = $translate('accounts.label.accounts')
	let modeLabel = $translate('accounts.label.editAccount')

	export let validSchema: SuperValidated<
		Partial<AccountDTO>,
		unknown,
		Partial<AccountDTO>
	>
	export let validator: ValidationAdapter<Partial<AccountDTO>, Partial<AccountDTO>>
	export let userAccount: Writable<Account | undefined>
	export let accountUpdated: () => void

	const { form, enhance, errors, constraints } = superForm(validSchema, {
		dataType: 'json',
		SPA: true,
		resetForm: false,
		validators: validator,
		onUpdate: async ({ form }) => {
			if (!form.valid || !$userAccount) return

			isLoading = true
			const [profile] = $userAccount.expand.account_profiles_via_user_id

			// @TODO: Error when updating email, debug required
			const [err] = await updateUserAccount($userAccount?.id, profile.id, {
				...form.data,
			})

			isLoading = false

			if (err) {
				return $toast.fire({ message: err.message, variant: ToastVariant.ERROR })
			}

			accountUpdated()
		},
	})

	userAccount.subscribe(async (account) => {
		if (!account) return

		isLoading = true
		const [err, result] = await getUserAccount(String(account?.id))
		isLoading = false

		if (err) {
			$toast.fire({ message: err.message, variant: ToastVariant.ERROR })
			return
		}

		$form = {
			email: result?.email,
			lrn: result?.lrn,
			...result?.expand.account_profiles_via_user_id[0].details,
		}
	})

	$: $isShown = Boolean($page.state.accountsEditDrawer?.isOpen)

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
			type: 'email',
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
			type: 'text',
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

		{
			name: 'password',
			colSpan: 'col-span-full',
			control: 'text',
			type: 'password',
		},

		{
			name: 'passwordConfirm',
			colSpan: 'col-span-full',
			control: 'text',
			type: 'password',
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
		<form method="post" class="w-full" use:enhance>
			<JoyGrid cols={GridCols[6]} gap={ContainerGap.XS} class="w-full">
				{#each fields as field}
					{#if field.control == 'text'}
						<JoyContainer col class={`${field.colSpan}`}>
							<JoyInput
								bordered
								class="w-full bg-white"
								type={field.type}
								bind:value={$form[field.name]}
								attributes={$constraints[field.name]}
							>
								<svelte:fragment slot="labeled-l">
									<JoyText weight={FontWeight.BOLD} size={TextSize.SM}>
										{$translate(`accounts.fields.${field.name}`)}
									</JoyText>
								</svelte:fragment>
							</JoyInput>

							{#if $errors[field.name]}
								<span class="first-letter:capitalize text-error text-sm select-none">
									{$errors[field.name]}
								</span>
							{/if}
						</JoyContainer>
					{:else if field.control == 'textarea'}
						<JoyTextArea
							bordered
							containerClass={field.colSpan}
							class={`w-full bg-white resize-none h-[200px]`}
							bind:value={$form[field.name]}
							attributes={$constraints[field.name]}
						>
							<svelte:fragment slot="label-top">
								<JoyText weight={FontWeight.BOLD} size={TextSize.SM} class="label-text">
									{$translate(`accounts.fields.${field.name}`)}
								</JoyText>
							</svelte:fragment>
						</JoyTextArea>
					{/if}
				{/each}

				<JoyButton
					class="col-span-full"
					size={ButtonSize.MD}
					variant={ButtonVariant.PRIMARY}
					type="submit"
				>
					{$translate('common.label.submit')}
				</JoyButton>
			</JoyGrid>
			<SuperDebug data={form} />
		</form>
	</JoyContainer>
</JoySliderDrawer>
