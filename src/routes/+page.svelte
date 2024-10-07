<script lang="ts">
	import JoyToast from '$lib/components/Advanced/Toast/JoyToast.svelte'
	import JoyAnchor from '$lib/components/Base/Anchor/JoyAnchor.svelte'
	import { ButtonSize, ButtonVariant } from '$lib/components/Base/Button'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import JoyColumn from '$lib/components/Base/Column/JoyColumn.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { Size } from '$lib/components/Base/Icon/types'
	import JoyInput from '$lib/components/Base/Input/JoyInput.svelte'
	import JoyRow from '$lib/components/Base/Row/JoyRow.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import {
		FontWeight,
		TextColor,
		TextSize,
		TextTag,
	} from '$lib/components/Base/Text/types'
	import { translate } from '$lib/translations'
	import {
		BorderRounded,
		ContainerGap,
		ContainerPadding,
		Justify,
		Shadow,
	} from '$lib/types'
	import { superForm } from 'sveltekit-superforms'

	import { userService } from '$lib/modules/authentication'
	import { ToastVariant } from '$lib/components/Advanced/Toast/types.js'
	const { registerUser } = userService()

	let isAuthenticating = false,
		toast: JoyToast
	export let data

	const { form, enhance, errors, constraints } = superForm(data.validSchema, {
		dataType: 'json',
		SPA: true,
		resetForm: false,
		validators: data.validator,
		onUpdate: async ({ form }) => {
			if (!form.valid) return

			const [err] = await registerUser({
				...form.data,
				passwordConfirm: form.data.password_confirmation,
			})

			if (err) {
				return toast.fire({ message: err.message, variant: ToastVariant.ERROR })
			}

			return toast.fire({ message: 'User recorded', variant: ToastVariant.SUCCESS })
		},
	})
</script>

<div class="bg"></div>

<div class="grid place-items-center w-full h-full relative">
	<JoyContainer class="flex-wrap w-2/3" justify={Justify.BETWEEN}>
		<JoyColumn padding={ContainerPadding.MD}>
			<JoyText
				tag={TextTag.H1}
				size={TextSize.XL_6}
				weight={FontWeight.BOLD}
				color={TextColor.PRIMARY}
				class="mb-4"
			>
				{$translate('common.platform.name')}
			</JoyText>
			<JoyText tag={TextTag.PARA} size={TextSize.LG} class="whitespace-pre-wrap mb-8">
				{$translate('common.platform.tagline')}
			</JoyText>
			<JoyRow gap={ContainerGap.XXS}>
				<JoyAnchor
					variant={ButtonVariant.SECONDARY}
					label={$translate('common.label.aboutUs')}
				/>

				<JoyAnchor label={$translate('common.label.faqs')} />
			</JoyRow>
		</JoyColumn>

		<!-- Login form -->
		<JoyColumn
			shadow={Shadow.XL}
			rounded={BorderRounded.LG}
			padding={ContainerPadding.XL}
			class="w-[500px] bg-base-100 border"
		>
			<JoyText
				tag={TextTag.H1}
				size={TextSize.XL_3}
				weight={FontWeight.BOLD}
				class="mb-6"
			>
				{$translate('common.label.logIn')}
			</JoyText>

			<form method="post" use:enhance>
				<JoyContainer col class="bg-transparent relative">
					<JoyToast bind:this={toast} target="shell" id="route+page" />

					<JoyContainer col gap={ContainerGap.XXS} class="w-full mb-8">
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
							{#if $errors.lrn}
								<span class="first-letter:capitalize text-error">{$errors.lrn}</span>
							{/if}
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
							{#if $errors.password}
								<span class="first-letter:capitalize text-error">{$errors.password}</span>
							{/if}
						</div>

						<div class="relative w-full">
							<JoyInput
								class="w-full group bg-base-200/25 focus-within:bg-transparent"
								type="password"
								placeholder="Confirm Password"
								bind:value={$form.password_confirmation}
								attributes={$constraints.password_confirmation}
							>
								<JoyIcon
									icon="password-cursor"
									slot="labeled-l"
									size={Size.LG}
									class="group-focus-within:text-primary transition-colors duration-200"
								/>
							</JoyInput>
							{#if $errors.password_confirmation}
								<span class="first-letter:capitalize text-error"
									>{$errors.password_confirmation}</span
								>
							{/if}
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

						{$translate('common.label.signIn')}
					</JoyButton>

					<div class="border border-neutral border-opacity-25 w-full" />

					<div class="flex justify-center w-full">
						<span class="-mt-7 bg-base-100 text-center w-1/5 -z-0">or</span>
					</div>
					<JoyAnchor
						plain
						class="text-center text-sm w-full"
						label={$translate('common.label.signInAsAdministrator')}
					/>
				</JoyContainer>
			</form>

			<!-- <SuperDebug data={$form} /> -->
		</JoyColumn>
	</JoyContainer>
</div>

<style lang="scss">
	.bg {
		background-image: url('$lib/assets/layered-waves.svg');
		@apply w-full bg-cover bg-center bg-no-repeat absolute inset-0;
	}

	@media (orientation: portrait) {
		:global(body) {
			background-size: auto 100vh;
		}
	}
</style>
