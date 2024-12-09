<script lang="ts">
	import JoyDataTable from '$lib/components/Advanced/DataTable/JoyDataTable.svelte'
	import { ToastVariant } from '$lib/components/Advanced/Toast/types'
	import JoyContainer from '$lib/components/Base/Container/JoyContainer.svelte'
	import JoyText from '$lib/components/Base/Text/JoyText.svelte'
	import { FontWeight, TextColor, TextSize } from '$lib/components/Base/Text/types'
	import { accountsService, accounts } from '$lib/modules/accounts'
	import { App } from '$lib/modules/app'
	import type { User } from '$lib/modules/authentication'
	import type { ColumnDef } from '@tanstack/svelte-table'
	import { onMount, tick } from 'svelte'
	import JoyButton from '$lib/components/Base/Button/JoyButton.svelte'
	import { translate } from '$lib/translations'
	import { ButtonVariant } from '$lib/components/Base/Button'
	import { pushState } from '$app/navigation'
	import AccountCreateDrawer from '$lib/modules/accounts/components/AccountCreateDrawer.svelte'
	import AccountEditDrawer from '$lib/modules/accounts/components/AccountEditDrawer.svelte'
	import type { Account } from '$lib/modules/accounts/types.js'
	import { writable } from 'svelte/store'
	const { listUserAccounts } = accountsService()
	const { toast, currentRoute } = App

	export let data

	const userAccount = writable<Account>()

	const initialLoad = async () => {
		const err = await listUserAccounts()

		if (err) {
			$toast.fire({ message: err.message, variant: ToastVariant.ERROR })
		}
	}

	onMount(initialLoad)

	const columns: ColumnDef<User>[] = [
		{
			accessorKey: 'lrn',
			header: 'LRN',
			id: 'user.lrn',
			cell: (info) => info.getValue(),
		},

		{
			accessorKey: 'username',
			header: 'Username',
			id: 'user.username',
			cell: (info) => info.getValue(),
		},

		{
			accessorKey: 'email',
			header: 'Email',
			id: 'user.email',
			cell: (info) => info.getValue(),
		},

		{
			accessorKey: 'expand.account_profiles_via_user_id.0.details.firstName',
			header: 'First Name',
			id: 'user.account_profile.firstName',
			cell: (info) => info.getValue() || '',
		},

		{
			accessorKey: 'expand.account_profiles_via_user_id.0.details.lastName',
			header: 'Last Name',
			id: 'user.account_profile.lastName',
			cell: (info) => info.getValue() || '',
		},

		{
			id: 'actions',
			cell: (props) => props.row,
		},
	]

	const accountCreated = () => {
		$toast.fire({
			message: 'New account has been created',
			variant: ToastVariant.SUCCESS,
		})

		tick().then(initialLoad)
	}

	const accountUpdated = () => {
		$toast.fire({
			message: 'Account has been updated',
			variant: ToastVariant.SUCCESS,
		})

		tick().then(initialLoad)
	}

	const addAccount = async () => {
		await tick()

		pushState('', {
			accountsCreateDrawer: {
				isOpen: true,
			},
		})
	}

	const viewAccount = async (account: User) => {
		await tick()
		$userAccount = account as Account

		pushState('', {
			accountsEditDrawer: {
				isOpen: true,
			},
		})
	}

	const manageAccount = (event: CustomEvent<User>) => {
		const user = event.detail

		viewAccount(user)
	}
</script>

<AccountCreateDrawer
	validSchema={data.newAccountValidSchema}
	validator={data.newAccountValidator}
	{accountCreated}
/>

<AccountEditDrawer
	{userAccount}
	validSchema={data.updateAccountValidSchema}
	validator={data.updateAccountValidator}
	{accountUpdated}
/>

<JoyContainer class="w-full" col>
	<JoyText size={TextSize.XL_3} weight={FontWeight.BOLD} color={TextColor.PRIMARY}>
		{$currentRoute?.label}
	</JoyText>

	<JoyButton variant={ButtonVariant.PRIMARY} on:click={addAccount}>
		{$translate('accounts.label.addNewAccount')}
	</JoyButton>

	<JoyDataTable {columns} data={accounts} on:datatable-row-selected={manageAccount}
	></JoyDataTable>
</JoyContainer>
