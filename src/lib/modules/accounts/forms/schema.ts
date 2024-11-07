import { useAuthFormSchema } from '$lib/modules/authentication'
import { translate, loadTranslations } from '$lib/translations'
import { get } from 'svelte/store'
import { object, ref, string } from 'yup'
const $translate = get(translate)

export const useAccountFormSchema = async (locale = 'en', pathname = '/') => {
	await loadTranslations(locale, pathname)
	const { usePassword, usePasswordConfirmation } = await useAuthFormSchema(
		locale,
		pathname
	)

	const useLrn = () => ({
		lrn: string(),
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

	const useOptionalPassword = () => ({
		password: string(),
	})

	const useOptPasswordConfirmation = () => ({
		passwordConfirm: string().when('password', ([password], schema) => {
			if (password > 0) {
				return schema
					.required('Confirm password is required')
					.oneOf([ref('password')], 'Confirm password must match')
			}

			return schema
		}),
	})

	const newAccountSchema = object({
		...useLrn(),
		...useEmail(),
		...useFirstName(),
		...useMiddleName(),
		...useLastName(),
		...useAddress(),
		...useBio(),
		...usePassword(),
		...usePasswordConfirmation(),
	})

	const updateAccountSchema = object({
		...useLrn(),
		...useEmail(),
		...useFirstName(),
		...useMiddleName(),
		...useLastName(),
		...useAddress(),
		...useBio(),
		...useOptionalPassword(),
		...useOptPasswordConfirmation(),
	})

	return {
		newAccountSchema,
		updateAccountSchema,
	}
}
