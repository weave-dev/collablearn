<script lang="ts">
	import { afterNavigate } from '$app/navigation'
	import { page } from '$app/stores'
	import JoyAvatar from '$lib/components/Advanced/Avatar/JoyAvatar.svelte'
	import JoyContextMenu from '$lib/components/Advanced/ContextMenu/JoyContextMenu.svelte'
	import JoySidebar from '$lib/components/Advanced/Sidebar/JoySidebar.svelte'
	import JoyAnchor from '$lib/components/Base/Anchor/JoyAnchor.svelte'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyIcon from '$lib/components/Base/Icon/JoyIcon.svelte'
	import { Size } from '$lib/components/Base/Icon/types'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { FontWeight } from '$lib/components/Base/Text/types'
	import { App } from '$lib/modules/app'
	import { authService, user } from '$lib/modules/authentication'
	import { routes, type Route } from '$lib/routes'
	import { RouteGroup } from '$lib/routes/types'
	import { translate } from '$lib/translations'
	import { ContainerGap, ContainerPadding, Justify } from '$lib/types'
	import { AlignItems } from '$lib/types/AlignItems'
	const { signOutUser } = authService()
	const { currentRoute } = App

	// @TODO: move to a separate component together with user
	// context menu
	const userMenuRoutes: Route[] = [
		{
			icon: 'bell-bold',
			path: '/app',
			label: $translate('common.label.notifications'),
		},
		{
			icon: 'baseline-chat-bubble-outline',
			path: '/app',
			label: $translate('common.label.giveFeedback'),
		},
		{
			icon: 'baseline-remove-red-eye',
			path: '/app',
			label: $translate('common.label.privacyPolicy'),
		},
		{
			icon: 'baseline-settings',
			path: '/app',
			label: $translate('common.label.termsOfService'),
		},
	]

	$: adminRoutes = $routes.filter(
		(route) => route.group === RouteGroup.ADMIN && route.isShown
	)
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
		{
			routes: adminRoutes,
			label: $translate('common.sidebar.admin'),
		},
	]

	afterNavigate(() => {
		$currentRoute = $routes.find((route) => route.path === $page.url.pathname)
	})
</script>

<JoyContainer class="w-screen h-screen" gap={ContainerGap.NONE}>
	<JoySidebar let:SidebarItem class="w-[300px] border-r overflow-y-auto">
		<!-- @TODO: make this a separate component -->
		<JoyContainer
			class="w-full"
			padding={ContainerPadding.MD}
			alignItems={AlignItems.CENTER}
		>
			<JoyAvatar user={$user} class="shrink-0" />
			<JoyContainer col gap={ContainerGap.NONE} class="grow truncate">
				<JoyText weight={FontWeight.BOLD} class="truncate max-w-full w-full">
					{$user.username}
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

	<JoyContainer col padding={ContainerPadding.MD} class="w-full">
		<slot />
	</JoyContainer>

	<JoySidebar let:SidebarItem class="w-[300px] border-l px-8 py-6">
		<!-- @TODO refactor to a separate component -->
		<JoyContainer alignItems={AlignItems.CENTER} justify={Justify.END} class="w-full">
			<JoyIcon icon="bell-bold" size={Size.LG} class="text-warning" />
			<JoyContextMenu placement="left-start" contentsClass="bg-primary text-white">
				<button let:showContextMenu on:click={showContextMenu} slot="context-target">
					<JoyAvatar user={$user} />
				</button>
				<svelte:fragment slot="context-contents">
					<JoyContainer
						col
						gap={ContainerGap.NONE}
						padding={ContainerPadding.XS}
						class="max-w-[350px] w-[350px]"
					>
						<JoyContainer
							class="w-full"
							padding={ContainerPadding.SM}
							alignItems={AlignItems.START}
						>
							<JoyAvatar user={$user} class="shrink-0" />
							<JoyContainer col gap={ContainerGap.NONE} class="grow truncate">
								<JoyText weight={FontWeight.BOLD} class="truncate max-w-full w-full">
									{$user.username}
								</JoyText>
								<JoyText>
									{$translate('common.label.lrn')}{$user.lrn || '---'}
								</JoyText>

								<JoyAnchor href="#" plain class="mt-4">
									<JoyText color="text-secondary">
										{$translate('common.label.editProfile')}
									</JoyText>
								</JoyAnchor>
							</JoyContainer>
						</JoyContainer>

						<JoyContainer
							class="w-full border border-y"
							padding={ContainerPadding.SM}
							alignItems={AlignItems.START}
							col
						>
							{#each userMenuRoutes as route}
								<SidebarItem icon={route.icon} type="a" href={route.path}>
									<svelte:fragment slot="label">{route.label}</svelte:fragment>
								</SidebarItem>
							{/each}
						</JoyContainer>

						<JoyContainer
							class="w-full"
							padding={ContainerPadding.SM}
							alignItems={AlignItems.START}
							col
						>
							<SidebarItem
								icon="baseline-power-settings-new"
								type="button"
								on:click={signOutUser}
							>
								<svelte:fragment slot="label"
									>{$translate('common.label.signOut')}</svelte:fragment
								>
							</SidebarItem>
						</JoyContainer>
					</JoyContainer>
				</svelte:fragment>
			</JoyContextMenu>

			<!-- @TODO refactor to a separate component -->
		</JoyContainer>
	</JoySidebar>
</JoyContainer>
