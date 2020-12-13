export type PhotosType = {
    small: null | string,
    large: null | string
}

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType
}