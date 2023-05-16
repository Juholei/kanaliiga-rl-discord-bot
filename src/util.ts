import { Attachment, Collection } from "discord.js";

const reFileExtension = /(?:\.([^.]+))?$/;
export const ACCEPTABLE_FILE_EXTENSION = ".replay"


export const parseFileExtension = (fileName: string) => {
    return `.${reFileExtension.exec(fileName)[1]}`
}

export const allAttahcmentsAreCorrectType =
    (attachments: Collection<string, Attachment>): boolean => {

        /* eslint-disable */
        for (const [_, value] of attachments) {
            /* eslint-enable */
            if (parseFileExtension(value.url) !== ACCEPTABLE_FILE_EXTENSION) {
                return false
            }
        }

        return true
    }

export const getDivisionName = (postTitle: string) => {
    const splitString = postTitle.split(', ')
    //splits into array to get division name, for example: [ 'Solita Ninja vs Solita Herkku', 'Challengers', '1.5.2023' ]
    const postTitleDivisionName = splitString[1]
    return postTitleDivisionName
}    
