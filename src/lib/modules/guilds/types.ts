import type { RecordModel } from "pocketbase";
import type { User } from "$lib/modules/authentication";



export interface Guild extends RecordModel {
    name : string,
    descriptions : string,
    owner_id : string,
    status : string,
    expand : {
        owner_id  : User
    }
}



export const GuildStatusDTO =  {
    APPROVED : 'approved',
    DEACTIVATE :'deactivate',
    REJECT : 'reject',
    CLOSED : 'closed',
    PENDING : 'pending'
} as const


export interface NewGuildDTO {
    name : string,
    descriptions : string,
    owner_id : User,
    status : typeof GuildStatusDTO
}
