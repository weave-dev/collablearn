import type { RecordModel } from 'pocketbase'
import { type NewUserDTO, type User } from '$lib/modules/authentication'

export interface Account extends User {
	expand: {
		account_profiles_via_user_id: Array<AccountProfile>
	}
}

export interface AccountProfile extends RecordModel {
	avatar: string
	details: AccountProfileDetails
	user_id: string
}

export interface AccountProfileDetails {
	firstName: string
	middleName: string
	lastName: string
	address: string
	bio: string
}

export interface AccountDTO extends AccountProfileDetails, NewUserDTO {
	[key: string]: string | undefined
	email: string
	lrn?: string
}
