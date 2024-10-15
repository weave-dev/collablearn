import { guildFormSchema } from "$lib/modules/guilds/forms/schema";
import { superValidate } from "sveltekit-superforms";
import type { PageLoad } from "./$types";
import { yup } from "sveltekit-superforms/adapters";

export const load : PageLoad = async ({ url }) => {

    const { newGuildSchema } = await guildFormSchema('en', url.pathname)


    const guildValidator = yup(newGuildSchema)

    const guildValidSchema = await superValidate(guildValidator)


    return { 
        guildValidSchema,
        guildValidator
    }
}