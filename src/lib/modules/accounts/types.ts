import type { RecordModel } from 'pocketbase'
import { type User } from '$lib/modules/authentication'

export interface Account extends User {
	expand: {
		profiles_via_user: Array<AccountProfile>
	}
}

export interface AccountProfile extends RecordModel {
	details: AccountProfileDetails
	avatar: string
}

export interface AccountProfileDetails {
	firstName: string
	middleName: string
	lastName: string
	address: string
	bio: string
}
