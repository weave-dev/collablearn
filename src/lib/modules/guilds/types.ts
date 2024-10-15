import type { RecordModel } from "pocketbase";
import type { User } from "../authentication";



export interface Guild extends RecordModel {
    name : string,
    descriptions : string,
    owner_id : User,
    status : string,
}



export enum GuildStatusDTO  {
    APPROVED = 'approved',
    DEACTIVATE = 'deactivate',
    REJECT = 'reject',
    CLOSED = 'closed',
    PENDING = 'pending'
}


export interface newGuildDTO {
    name : string,
    descriptions : string,
    owner_id : User,
    status : GuildStatusDTO
}
