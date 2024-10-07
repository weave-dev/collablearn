import { superValidate } from 'sveltekit-superforms'
import { yup } from 'sveltekit-superforms/adapters'

import type { PageLoad } from './$types'
import { newUserSchema } from '$lib/modules/authentication'

export const load: PageLoad = async () => {
	const validator = yup(newUserSchema)
	const validSchema = await superValidate(validator)

	return { validSchema, validator }
}
