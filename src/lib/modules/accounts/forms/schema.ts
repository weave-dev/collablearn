import { translate, loadTranslations } from '$lib/translations'
import { get } from 'svelte/store'
import { object, string } from 'yup'
const $translate = get(translate)

export const useAccountFormSchema = async (locale = 'en', pathname = '/') => {
	await loadTranslations(locale, pathname)

	const useLrn = () => ({
		lrn: string().required($translate('accounts.validation.lrnRequired')),
	})

	const useEmail = () => ({
		email: string().email().required($translate('accounts.validation.emailRequired')),
	})

	const useFirstName = () => ({
		firstName: string().required($translate('accounts.validation.firstNameRequired')),
	})

	const useMiddleName = () => ({
		middleName: string().required($translate('accounts.validation.lastNameRequired')),
	})

	const useLastName = () => ({
		lastName: string().required($translate('accounts.validation.lastNameRequired')),
	})

	const useAddress = () => ({
		address: string().required($translate('accounts.validation.addressRequired')),
	})

	const useBio = () => ({
		bio: string().required($translate('accounts.validation.bioRequired')),
	})

	// @TODO debugging
	// const usePassword = () => ({
	// 	password: string().required($translate('auth.validation.password')),
	// })

	// const usePasswordConfirmation = () => ({
	// 	passwordConfirm: string()
	// 		.required('Confirm password is required')
	// 		.oneOf([ref('password')], 'Confirm password must match'),
	// })

	const newAccountSchema = object({
		...useLrn(),
		...useEmail(),
		...useFirstName(),
		...useMiddleName(),
		...useLastName(),
		...useAddress(),
		...useBio(),
	})

	return {
		newAccountSchema,
	}
}
