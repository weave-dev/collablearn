import type { RecordModel } from 'pocketbase'

export interface User extends RecordModel {
	email: string
	username: string
	lrn: string
	verified: boolean
	emailVisibility?: boolean
}

export interface LoginDTO {
	[key: string]: unknown
	password: string
}

export interface AdminUserLoginDTO extends LoginDTO {
	username: string
}

export interface UserLoginDTO extends LoginDTO {
	lrn?: string
}

export interface NewUserDTO extends UserLoginDTO {
	passwordConfirm: string
}

export type AuthErrorKeys = keyof typeof AuthError
export type AuthErrorValues = (typeof AuthError)[keyof typeof AuthError]
export const AuthError = {
	404: 'notFound',
} as const
