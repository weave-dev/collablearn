import type { User } from "$lib/modules/authentication"
import type { RecordModel } from "pocketbase"
import type { Guild } from "../types"

export interface Discussion extends RecordModel {
    title : string,
    content  : string,
    owner_id : string,
    guild_id : string,
     expand : {
        owner_id  : User,
        guild_id : Guild
    }
}


export interface NewDiscussionDTO {
    title : string,
    content : string,
    owner_id : User,
    guild_id : string
 }
