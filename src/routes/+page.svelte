<script lang="ts">
	import JoyAnchor from '$lib/components/Base/Anchor/JoyAnchor.svelte'
	import { ButtonVariant } from '$lib/components/Base/Button'
	import JoyColumn from '$lib/components/Base/Column/JoyColumn.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyRow from '$lib/components/Base/Row/JoyRow.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import {
		FontWeight,
		TextColor,
		TextSize,
		TextTag,
	} from '$lib/components/Base/Text/types'
	import { formMode } from '$lib/modules/authentication'
	import { FormMode } from '$lib/modules/authentication/components/types'
	import RegisterLrn from '$lib/modules/authentication/components/RegisterLrn.svelte'
	import UserLogin from '$lib/modules/authentication/components/UserLogin.svelte'
	import { translate } from '$lib/translations'
	import { ContainerGap, ContainerPadding, Justify } from '$lib/types'
	import type { PageData } from './$types'
	import AdminUserLogin from '$lib/modules/authentication/components/AdminUserLogin.svelte'

	export let data: PageData
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

		<!-- Register form -->
		{#if $formMode === FormMode.REGISTER}
			<RegisterLrn
				validSchema={data.registerValidSchema}
				validator={data.registerValidator}
			/>
		{:else if $formMode == FormMode.USER_LOGIN}
			<UserLogin validSchema={data.loginValidSchema} validator={data.loginValidator} />
		{:else if $formMode == FormMode.ADMIN_LOGIN}
			<AdminUserLogin
				validSchema={data.loginAdminValidSchema}
				validator={data.loginAdminValidator}
			/>
		{/if}
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
