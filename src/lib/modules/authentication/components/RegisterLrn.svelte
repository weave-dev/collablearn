<script lang="ts">
	import type { ValidationAdapter } from 'sveltekit-superforms/adapters'
	import type { SuperValidated } from 'sveltekit-superforms'
	import { superForm } from 'sveltekit-superforms'

	import JoyToast from '$lib/components/Advanced/Toast/JoyToast.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import JoyColumn from '$lib/components/Base/Column/JoyColumn.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { Size } from '$lib/components/Base/Icon/types'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { TextTag, TextSize, FontWeight } from '$lib/components/Base/Text/types'
	import { translate } from '$lib/translations'
	import { BorderRounded, ContainerGap, ContainerPadding, Shadow } from '$lib/types'
	import { authService, type NewUserDTO } from '$lib/modules/authentication'
	import { ToastVariant } from '$lib/components/Advanced/Toast/types.js'

	export let validSchema: SuperValidated<NewUserDTO, unknown, NewUserDTO>
	export let validator: ValidationAdapter<NewUserDTO, NewUserDTO>

	let toast: JoyToast,
		isAuthenticating = false

	const { registerUser } = authService()

	const { form, enhance, errors, constraints } = superForm(validSchema, {
		dataType: 'json',
		SPA: true,
		resetForm: false,
		validators: validator,
		onUpdate: async ({ form }) => {
			if (!form.valid) return

			isAuthenticating = true
			const [err] = await registerUser({
				...form.data,
				passwordConfirm: form.data.passwordConfirm,
			})
			isAuthenticating = false

			if (err) {
				return toast.fire({ message: err.message, variant: ToastVariant.ERROR })
			}

			return toast.fire({ message: 'User recorded', variant: ToastVariant.SUCCESS })
		},
	})
</script>

<JoyColumn
	shadow={Shadow.XL}
	rounded={BorderRounded.LG}
	padding={ContainerPadding.XL}
	class="w-[500px] bg-base-100 border"
>
	<JoyText tag={TextTag.H1} size={TextSize.XL_3} weight={FontWeight.BOLD} class="mb-6">
		{$translate('common.label.logIn')}
	</JoyText>

	<form method="post" use:enhance>
		<JoyContainer col class="bg-transparent relative">
			<JoyToast bind:this={toast} target="shell" id="route+page" />

			<JoyContainer col gap={ContainerGap.SM} class="w-full mb-8">
				<div class="relative w-full">
					<JoyInput
						class="w-full group bg-base-200/25 focus-within:bg-transparent"
						type="text"
						placeholder="Username"
						bind:value={$form.lrn}
						attributes={$constraints.lrn}
					>
						<JoyIcon
							icon="user-circle"
							slot="labeled-l"
							size={Size.LG}
							class="group-focus-within:text-primary transition-colors duration-200"
						/>
					</JoyInput>

					<span
						class="first-letter:capitalize text-error text-sm"
						class:text-transparent={!$errors.lrn}>{$errors.lrn}</span
					>
				</div>

				<div class="relative w-full">
					<JoyInput
						class="w-full group bg-base-200/25 focus-within:bg-transparent"
						type="password"
						placeholder="Password"
						bind:value={$form.password}
						attributes={$constraints.password}
					>
						<JoyIcon
							icon="password-cursor"
							slot="labeled-l"
							size={Size.LG}
							class="group-focus-within:text-primary transition-colors duration-200"
						/>
					</JoyInput>

					<span
						class="first-letter:capitalize text-error text-sm"
						class:text-transparent={!$errors.password}>{$errors.password}</span
					>
				</div>

				<div class="relative w-full">
					<JoyInput
						class="w-full group bg-base-200/25 focus-within:bg-transparent"
						type="password"
						placeholder="Confirm Password"
						bind:value={$form.passwordConfirm}
						attributes={$constraints.passwordConfirm}
					>
						<JoyIcon
							icon="password-cursor"
							slot="labeled-l"
							size={Size.LG}
							class="group-focus-within:text-primary transition-colors duration-200"
						/>
					</JoyInput>

					<span
						class="first-letter:capitalize text-error text-sm"
						class:text-transparent={!$errors.passwordConfirm}
						>{$errors.passwordConfirm}</span
					>
				</div>
			</JoyContainer>

			<JoyButton
				size={ButtonSize.MD}
				variant={ButtonVariant.PRIMARY}
				type="submit"
				disabled={isAuthenticating}
				class="items-center gap-2 w-full shadow-none focus:shadow-lg focus:shadow-primary/50 z-10"
			>
				{#if isAuthenticating}
					<JoyIcon icon="loading" />
				{/if}

				{$translate('common.label.createAccount')}
			</JoyButton>

			<div class="border border-neutral border-opacity-25 w-full" />

			<div class="flex justify-center w-full">
				<span class="-mt-7 bg-base-100 text-center w-1/5 -z-0">or</span>
			</div>
			<JoyButton
				plain
				size={ButtonSize.SM}
				class="text-center text-sm w-full"
				label={$translate('common.label.signIn')}
			/>
		</JoyContainer>
	</form>

	<!-- <SuperDebug data={$form} /> -->
</JoyColumn>
