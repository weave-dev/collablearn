import type { RecordModel } from 'pocketbase'

export interface User extends RecordModel {
	email: string
	username: string
	emailVisibility: boolean
	lrn: string
	verified: boolean
}

export interface LoginDTO {
	[key: string]: unknown
	password: string
}

export interface AdminUserLoginDTO extends LoginDTO {
	username: string
}

export interface UserLoginDTO extends LoginDTO {
	lrn: string
}

export interface NewUserDTO extends UserLoginDTO {
	passwordConfirm: string
}
