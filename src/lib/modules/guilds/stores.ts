import { writable} from "svelte/store";
import type { Guild } from "./types";


export const guilds = writable<Array<Guild>>([]);
export const ownGuilds = writable<Array<Guild>>([]);