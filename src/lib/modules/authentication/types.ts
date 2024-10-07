import type { RecordModel } from 'pocketbase'

export interface User extends RecordModel {
	email: string
	emailVisibility: boolean
	lrn: string
	verified: boolean
}

export interface UserDTO {
	lrn: string
	password: string
	passwordConfirm: string
}
