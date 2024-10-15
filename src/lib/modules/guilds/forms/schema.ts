import { loadTranslations } from "$lib/translations"
import {object, string} from 'yup'

export const guildFormSchema = async ( locale = 'en', pathname = '/') => {

    await loadTranslations(locale, pathname);



    const useName = () => ({
        name : string().required(),
    })

    const useDescription = () => ({
        description : string().required(),
    })



    const newGuildSchema = object({
        ...useName(),
        ...useDescription()
    })




    return {
        newGuildSchema
    }
}  