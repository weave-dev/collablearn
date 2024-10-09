<script lang="ts">
	import { page } from '$app/stores'
	import JoyAvatar from '$lib/components/Advanced/Avatar/JoyAvatar.svelte'
	import JoySidebar from '$lib/components/Advanced/Sidebar/JoySidebar.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { Size } from '$lib/components/Base/Icon/types'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { FontWeight } from '$lib/components/Base/Text/types'
	import { user } from '$lib/modules/authentication'
	import { routes } from '$lib/routes'
	import { RouteGroup } from '$lib/routes/types'
	import { translate } from '$lib/translations'
	import { ContainerGap, ContainerPadding, Justify } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'

	$: menuRoutes = $routes.filter(
		(route) => route.group === RouteGroup.MENU && route.isShown
	)
	$: myTaskRoutes = $routes.filter(
		(route) => route.group === RouteGroup.MY_TASKS && route.isShown
	)
	$: lessonActivitiesRoutes = $routes.filter(
		(route) => route.group === RouteGroup.LESSON_ACTIVITIES && route.isShown
	)

	$: routeGroups = [
		{
			routes: menuRoutes,
			label: $translate('common.sidebar.menu'),
		},
		{
			routes: myTaskRoutes,
			label: $translate('common.sidebar.myTasks'),
		},
		{
			routes: lessonActivitiesRoutes,
			label: $translate('common.sidebar.lessonActivities'),
		},
	]
</script>

<JoyContainer class="w-screen h-screen" gap={ContainerGap.NONE}>
	<JoySidebar let:SidebarItem class="w-[300px] border-r">
		<JoyContainer
			class="w-full"
			padding={ContainerPadding.MD}
			alignItems={AlignItems.CENTER}
		>
			<JoyAvatar user={$user} class="shrink-0" />
			<JoyContainer col gap={ContainerGap.NONE} class="grow truncate">
				<JoyText weight={FontWeight.BOLD} class="truncate max-w-full w-full">
					{$user.username}
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, placeat.
				</JoyText>
				<JoyText>
					{$translate('common.label.lrn')}{$user.lrn || '---'}
				</JoyText>
			</JoyContainer>
		</JoyContainer>
		{#each routeGroups as group (group.label)}
			<JoyContainer
				col
				padding={ContainerPadding.MD}
				gap={ContainerGap.NONE}
				class="w-full"
			>
				<JoyText weight={FontWeight.BOLD} class="mb-4">
					{group.label}
				</JoyText>

				{#each group.routes as route (route.path)}
					<SidebarItem
						icon={route.icon}
						type="a"
						href={route.path}
						class="transition-colors duration-250 hover:bg-accent/50 p-2"
						active={$page.url.pathname === route.path}
					>
						<svelte:fragment slot="label">
							{route.label}
						</svelte:fragment>
					</SidebarItem>
				{/each}
			</JoyContainer>
		{/each}
	</JoySidebar>
	<slot />

	<JoySidebar class="w-[300px] border-l px-8 py-6">
		<JoyContainer alignItems={AlignItems.CENTER} justify={Justify.END} class="w-full">
			<JoyIcon icon="bell-bold" size={Size.LG} class="text-warning" />
			<JoyAvatar user={$user} />
		</JoyContainer>
	</JoySidebar>
</JoyContainer>
