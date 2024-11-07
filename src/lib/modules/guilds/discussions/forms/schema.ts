import { loadTranslations } from "$lib/translations"
import {object, string} from 'yup'

export const useDiscussionFormSchema = async ( locale = 'en', pathname = '/') => {

    await loadTranslations(locale, pathname);



    const useTitle = () => ({
        title : string().required(),
    })

    const useContent = () => ({
        content : string().required(),
    })



    const newDiscussionSchema = object({
        ...useTitle(),
        ...useContent()
    })




    return {
        newDiscussionSchema
    }
}  