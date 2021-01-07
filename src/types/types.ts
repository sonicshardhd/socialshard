export type PhotosType = {
    small: null | string,
    large: null | string
}

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type UserProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type UserPostWallType = {
    id: number
    message: string
    likesCount: number
}