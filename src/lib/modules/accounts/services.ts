import { createService } from '$lib/modules/base/services'
import type { NewUserDTO, User } from '$lib/modules/authentication'
import { omit, tryit } from 'radash'
import { accounts } from './stores'
import type { Account, AccountDTO, AccountProfile, AccountProfileDetails } from './types'

const collection = 'users'
const service = createService<User>(collection)
const accountProfilesService = createService<AccountProfile>('account_profiles')

const listUserAccounts = async (page = 1, limit = 30) => {
	const [err, result] = await tryit(service.list)(page, limit, {
		sort: '-created',
		expand: 'account_profiles_via_user_id',
	})

	if (err) return err

	accounts.set(result.items)
}

const createUserAccount = async (newAccount: AccountDTO) => {
	const [err, result] = await tryit(service.create)(newAccount)

	if (err) return [err, undefined]

	const details = omit(newAccount, [
		'lrn',
		'email',
		'password',
		'passwordConfirm',
	]) as unknown as AccountProfileDetails

	const [profileCreateErr, profileCreateResult] = await tryit(
		accountProfilesService.create
	)({ user_id: result.id, details })

	if (profileCreateErr) return [profileCreateErr, undefined]

	return [undefined, profileCreateResult]
}

const getUserAccount = async (id: string): Promise<[Error?, Account?]> => {
	const [err, result] = await tryit(service.first)(`id = '${id}'`, {
		expand: 'account_profiles_via_user_id',
	})

	if (err) {
		return [err, undefined]
	}

	return [undefined, result as Account]
}

const updateUserAccount = async (
	id: string,
	profileId: string,
	accountDTO: Partial<AccountDTO>
) => {
	const data: Partial<User> = {
		...accountDTO,
	}

	const [err] = await tryit(service.update)(id, data)

	if (err) return [err, undefined]

	const details = omit(data, [
		'lrn',
		'email',
		'emailVisibility',
		'password',
		'passwordConfirm',
	]) as unknown as AccountProfileDetails

	const [profileUpdateErr, profileUpdateResult] = await tryit(
		accountProfilesService.update
	)(profileId, { details })

	if (profileUpdateErr) return [profileUpdateErr, undefined]

	return [undefined, profileUpdateResult]
}

export const accountsService = () => ({
	...service,
	createUserAccount,
	getUserAccount,
	updateUserAccount,
	listUserAccounts,
})
