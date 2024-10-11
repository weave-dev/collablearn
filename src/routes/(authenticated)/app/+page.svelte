<script lang="ts">
	import { ButtonSize } from '$lib/components/Base/Button/types'
	import {
		FontWeight,
		TextColor,
		TextSize,
		TextTag,
	} from '$lib/components/Base/Text/types'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { Border, BorderRounded, ContainerGap, ContainerPadding } from '$lib/types'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { ButtonVariant } from '$lib/components/Base/Button'
	import { DateTime } from 'luxon'
	import { commonFormat } from '$lib/composables/useDateUtils'
	import { user } from '$lib/modules/authentication'
	import { translate } from '$lib/translations'

	let now = commonFormat(DateTime.now().toString())
</script>

<JoyContainer
	class="w-full h-full overflow-y-auto"
	col={true}
	padding={ContainerPadding.SM}
	gap={ContainerGap.Y_LG}
>
	<JoyContainer class="w-full" padding={ContainerPadding.SM}>
		<JoyContainer col={true}>
			<JoyText tag={TextTag.PARA} size={TextSize.XS}>{now}</JoyText>
			<JoyText
				tag={TextTag.H1}
				weight={FontWeight.BOLD}
				size={TextSize.XL_3}
				color={TextColor.PRIMARY}>Hi {$user?.username}</JoyText
			>
		</JoyContainer>
	</JoyContainer>
	<div class="grid grid-cols-2 grid-flow-row gap-10 w-full">
		<JoyContainer
			col={true}
			rounded={BorderRounded.XL}
			padding={ContainerPadding.SM}
			border={Border.XXS}
		>
			<JoyText tag={TextTag.PARA} size={TextSize.SM}>
				{$translate('dashboard.label.completedTask')}
			</JoyText>
			<JoyText tag={TextTag.PARA} size={TextSize.XS} color={TextColor.PRIMARY}
				>{$translate('dashboard.label.filter')}</JoyText
			>
			<JoyText tag={TextTag.H1} size={TextSize.XL_6} weight={FontWeight.BOLD}>0</JoyText>
		</JoyContainer>
		<JoyContainer
			col={true}
			rounded={BorderRounded.XL}
			padding={ContainerPadding.SM}
			border={Border.XXS}
		>
			<JoyText tag={TextTag.PARA} size={TextSize.SM}
				>{$translate('dashboard.label.upcomingTask')}</JoyText
			>
			<JoyText tag={TextTag.PARA} size={TextSize.XS} color={TextColor.PRIMARY}
				>filter</JoyText
			>
			<JoyText tag={TextTag.H1} size={TextSize.XL_6} weight={FontWeight.BOLD}>0</JoyText>
		</JoyContainer>
		<JoyContainer
			col={true}
			rounded={BorderRounded.XL}
			padding={ContainerPadding.SM}
			border={Border.XXS}
		>
			<JoyText tag={TextTag.PARA} size={TextSize.SM}
				>{$translate('dashboard.label.dueToday')}</JoyText
			>
			<JoyText tag={TextTag.PARA} size={TextSize.XS} color={TextColor.PRIMARY}
				>filter</JoyText
			>
			<JoyText tag={TextTag.H1} size={TextSize.XL_6} weight={FontWeight.BOLD}>0</JoyText>
		</JoyContainer>

		<JoyContainer
			col={true}
			rounded={BorderRounded.XL}
			padding={ContainerPadding.SM}
			border={Border.XXS}
		>
			<JoyText tag={TextTag.PARA} size={TextSize.SM}
				>{$translate('dashboard.label.overdueTask')}</JoyText
			>
			<JoyText tag={TextTag.PARA} size={TextSize.XS} color={TextColor.PRIMARY}
				>filter</JoyText
			>
			<JoyText tag={TextTag.H1} size={TextSize.XL_6} weight={FontWeight.BOLD}>0</JoyText>
		</JoyContainer>
	</div>

	<JoyContainer
		class="w-full"
		col={true}
		border={Border.XXS}
		rounded={BorderRounded.XL}
		padding={ContainerPadding.MD}
	>
		<JoyText tag={TextTag.H1} weight={FontWeight.BOLD} size={TextSize.SM}
			>Recent Project(s)</JoyText
		>
		<JoyContainer>
			<span class="w-12 aspect-square rounded-lg bg-gray-400"> </span>
			<JoyContainer col={true}>
				<JoyText tag={TextTag.H1} size={TextSize.XS} weight={FontWeight.BOLD}>
					{$translate('common.platform.name')}
				</JoyText>
				<JoyText tag={TextTag.PARA} size={TextSize.XS}
					>Web-based Platform for Project and Collaboration</JoyText
				>
			</JoyContainer>
		</JoyContainer>
		<JoyButton class="w-full" variant={ButtonVariant.PRIMARY} size={ButtonSize.MD}>
			{$translate('dashboard.label.recentProject')}
		</JoyButton>
	</JoyContainer>
</JoyContainer>
