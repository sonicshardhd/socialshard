import axios from 'axios'
import { UserType, UserProfileType } from '../types/types'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '414876a9-8d41-4c69-80be-213ceb719eae'
    }
})

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

type FollowUnfollowResponse = {
    messages: Array<string>
    resultCode: number
    data: {}
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users/?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    follow(userId: number) {
        return instance.post<FollowUnfollowResponse>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<FollowUnfollowResponse>(`follow/${userId}`).then(res => res.data)
    }
}


export const userProfileAPI = {
    getProfile(userId: number) {
        return instance.get<UserProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    }
}
