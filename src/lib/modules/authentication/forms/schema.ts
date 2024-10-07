import { object, ref, string } from 'yup'

const useLrn = () => ({
	lrn: string().required('LRN is required'),
})

const usePassword = () => ({
	password: string().required('Password is required'),
})

const usePasswordConfirmation = () => ({
	password_confirmation: string()
		.required('Confirm password is required')
		.oneOf([ref('password')], 'Confirm password must match'),
})

export const newUserSchema = object({
	...useLrn(),
	...usePassword(),
	...usePasswordConfirmation(),
})

export const loginUserSchema = object({
	...useLrn(),
	...usePassword(),
})
