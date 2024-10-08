import { superValidate } from 'sveltekit-superforms'
import { yup } from 'sveltekit-superforms/adapters'

import type { PageLoad } from './$types'
import { useAuthFormSchema } from '$lib/modules/authentication'
import { App } from '$lib/modules/app'
import { redirect } from '@sveltejs/kit'
import { Home } from '$lib/routes/types'

export const load: PageLoad = async ({ url }) => {
	const { loginUserSchema, loginAdminUserSchema, newUserSchema } =
		await useAuthFormSchema('en', url.pathname)

	const auth = App.getAuthStore()

	if (auth.isValid) {
		return redirect(301, Home.INDEX)
	}

	const loginValidator = yup(loginUserSchema)
	const loginAdminValidator = yup(loginAdminUserSchema)
	const registerValidator = yup(newUserSchema)

	const loginValidSchema = await superValidate(loginValidator)
	const loginAdminValidSchema = await superValidate(loginAdminValidator)
	const registerValidSchema = await superValidate(registerValidator)

	return {
		loginAdminValidator,
		loginAdminValidSchema,
		loginValidator,
		loginValidSchema,
		registerValidSchema,
		registerValidator,
	}
}
