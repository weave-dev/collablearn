import { superValidate } from 'sveltekit-superforms'
import { yup } from 'sveltekit-superforms/adapters'

import type { PageLoad } from './$types'
import { useAccountFormSchema } from '$lib/modules/accounts/forms/schema'

export const load: PageLoad = async ({ url }) => {
	const { newAccountSchema, updateAccountSchema } = await useAccountFormSchema(
		'en',
		url.pathname
	)

	const newAccountValidator = yup(newAccountSchema)
	const updateAccountValidator = yup(updateAccountSchema)

	const newAccountValidSchema = await superValidate(newAccountValidator)
	const updateAccountValidSchema = await superValidate(updateAccountValidator)

	return {
		newAccountValidSchema,
		newAccountValidator,
		updateAccountValidSchema,
		updateAccountValidator,
	}
}
