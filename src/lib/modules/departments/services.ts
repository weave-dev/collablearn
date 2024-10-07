import { createService } from '$lib/modules/base/services'
import { departments } from '$lib/modules/departments'
import type { Department } from './types'
import { tryit } from 'radash'

const collection = 'departments'
const service = createService<Department>(collection)

const loadDepartments = async () => {
	const [err, result] = await tryit(service.list)()

	if (err) return err

	departments.set(result.items)
}

export const departmentService = () => ({
	...service,
	loadDepartments,
})
