
import { superValidate } from "sveltekit-superforms";
import type { PageLoad } from "./$types";
import { yup } from "sveltekit-superforms/adapters";
import { useDiscussionFormSchema } from "$lib/modules/guilds/discussions/forms/schema";

export const load : PageLoad = async ({ url }) => {

    const { newDiscussionSchema } = await useDiscussionFormSchema('en', url.pathname)


    const discussionValidator = yup(newDiscussionSchema)

    const discussionValidSchema = await superValidate(discussionValidator)


    return { 
        discussionValidator,
        discussionValidSchema
    }
}