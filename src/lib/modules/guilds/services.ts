import { tryit } from 'radash'
import { pb } from '../authentication'
import { createService } from '../base/services'
import { GuildStatusDTO, type Guild, type newGuildDTO } from './types'
import { guilds } from './stores'

const collection = 'guilds'
const service = createService<Guild>(collection)

const listGuilds = (page = 1, limit = 30) => {
	return service.list(page, limit, {
		sort: '-created',
		expand: 'owner_id',
	})
}

const createGuild = async (name: string, description: string) => {
	const data: newGuildDTO = {
		name: name,
		descriptions: description,
		owner_id: pb.authStore.model?.id,
		status: GuildStatusDTO.PENDING,
	}

	const [err, result] = await tryit(service.create)(data, {
        expand : 'owner_id'
    })

	if (err) return err

	guilds.update((items) => {
		return [...items, result]
	})
}

const updateGuild = (id: string, guild: Partial<Guild>) => {
	const data: Partial<Guild> = {
		...guild,
	}

	return service.update(id, data)
}

const loadGuilds = async () => {
	const [err, result] = await tryit(listGuilds)()

	if (err) return err

	guilds.set(result.items)
}

export const guildService = () => ({
	...service,
	createGuild,
	listGuilds,
	loadGuilds,
	updateGuild,
})
