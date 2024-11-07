import { writable} from "svelte/store";
import type { Discussion} from "./types";


export const discussions = writable<Array<Discussion>>([]);
export const ownDiscussions = writable<Array<Discussion>>([]);