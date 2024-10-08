import type { RecordModel } from 'pocketbase'

export enum Roles {
	ADMIN = 'admin',
	MODERATOR = 'moderator',
	STUDENT = 'student',
}

export interface Role extends RecordModel {
	name: Roles
	is_active: boolean
}

export interface UserRole extends RecordModel {
	user_id: string
	roles: Array<string>
	expand: { roles: Array<Role> }
}
