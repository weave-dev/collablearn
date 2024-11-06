import { superValidate } from 'sveltekit-superforms'
import { yup } from 'sveltekit-superforms/adapters'

import type { PageLoad } from './$types'
import { useAccountFormSchema } from '$lib/modules/accounts/forms/schema'

export const load: PageLoad = async ({ url }) => {
	const { newAccountSchema } =
		await useAccountFormSchema('en', url.pathname)

	const newAccountValidator = yup(newAccountSchema)

	const newAccountValidSchema = await superValidate(newAccountValidator)

	return {
		newAccountValidSchema,
		newAccountValidator,
	}
}
