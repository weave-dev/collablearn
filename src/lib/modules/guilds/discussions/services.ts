import { tryit } from 'radash'
import { pb } from '$lib/modules/authentication'
import { createService } from '$lib/modules/base/services'
import type { Discussion, NewDiscussionDTO } from './types'
import { discussions } from './stores'


const collection = 'discussions'
const service = createService<Discussion>(collection)

const listDiscussions = (page = 1, limit = 30) => {
	return service.list(page, limit, {
		sort: '-created',
		expand: 'owner_id',
	})
}

const createDiscussion = async (title : string, content: string, guildId : string) => {
	const data: NewDiscussionDTO = {
		title: title,
		content: content,
		owner_id: pb.authStore.model?.id,
		guild_id : guildId
		
	}

	const [err, result] = await tryit(service.create)(
		data, {
        expand : 'owner_id'
    })

	if (err) return err

	discussions.update((items) => {
		return [...items, result]
	})
}

const updateDiscussion = (id: string, discussion: Partial<Discussion>) => {
	const data: Partial<Discussion> = {
		...discussion,
	}

	return service.update(id, data)
}

const getDiscussion = async (filter : string) => {
	return service.first(filter);
}

const loadDiscussions = async () => {
	const [err, result] = await tryit(listDiscussions)()

	if (err) return err

	discussions.set(result.items)
}

export const discussionService = () => ({
	...service,
	createDiscussion,
	listDiscussions,
	loadDiscussions,
	updateDiscussion,
	getDiscussion,
})
