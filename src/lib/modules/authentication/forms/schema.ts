import { translate, loadTranslations } from '$lib/translations'
import { get } from 'svelte/store'
import { object, ref, string } from 'yup'
const $translate = get(translate)

export const useAuthFormSchema = async (locale = 'en', pathname = '/') => {
	await loadTranslations(locale, pathname)

	const useLrn = () => ({
		lrn: string().required($translate('auth.validation.lrn')),
	})

	const useUsername = () => ({
		username: string().required($translate('auth.validation.username')),
	})

	const usePassword = () => ({
		password: string().required($translate('auth.validation.password')),
	})

	const usePasswordConfirmation = () => ({
		passwordConfirm: string()
			.required('Confirm password is required')
			.oneOf([ref('password')], 'Confirm password must match'),
	})

	const newUserSchema = object({
		...useLrn(),
		...usePassword(),
		...usePasswordConfirmation(),
	})

	const loginUserSchema = object({
		...useLrn(),
		...usePassword(),
	})

	const loginAdminUserSchema = object({
		...useUsername(),
		...usePassword(),
	})

	return {
		newUserSchema,
		loginUserSchema,
		loginAdminUserSchema,
		usePassword,
		usePasswordConfirmation,
	}
}
