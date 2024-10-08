export type FormModeValue = (typeof FormMode)[keyof typeof FormMode]
export const FormMode = {
	USER_LOGIN: 'user_login',
	ADMIN_LOGIN: 'admin_login',
	REGISTER: 'register',
} as const
