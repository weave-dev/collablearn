import type { RecordListOptions, RecordModel, RecordOptions } from 'pocketbase'
import { pb } from '$lib/modules/authentication/'

export const createService = <T = RecordModel,>(collection: string) => {
	const list = (page: number = 1, limit = 30, options: RecordListOptions = {}) =>
		pb.collection<T>(collection).getList(page, limit, options)

	const create = (dto: Partial<T>, options: RecordOptions = {}) =>
		pb.collection<T>(collection).create(dto, options)
	const update = (id: string, dto: Partial<T>, options: RecordListOptions = {}) =>
		pb.collection<T>(collection).update(id, dto, options)

	const first = (filter: string, options: RecordListOptions = {}) =>
		pb.collection<T>(collection).getFirstListItem(filter, options)

	return {
		create,
		first,
		list,
		update,
	}
}
