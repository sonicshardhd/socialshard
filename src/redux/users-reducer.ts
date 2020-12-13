import { usersAPI } from '../api/api'
import { PhotosType, UserType } from '../types/types'

const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const IS_PAGE_FETCHING = 'IS_PAGE_FETCHING'
const IS_FOLLOW_FETCHING = 'IS_FOLLOW_FETCHING'


const initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    pageSize: 10,
    totalUsersCount: 0,
    isPageFetching: false,
    isFollowFetching: false,
    followingInProgress: [] as Array<number>
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})

type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId})

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userId: number
}

export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId})

type TogglePageIsFetchingActionType = {
    type: typeof IS_PAGE_FETCHING,
    isPageFetching: boolean
} 

export const togglePageIsFetching = (isPageFetching: boolean): TogglePageIsFetchingActionType => ({type: IS_PAGE_FETCHING, isPageFetching})

type ToggleFollowIsFetchingActionType = {
    type: typeof IS_FOLLOW_FETCHING,
    isFollowFetching: boolean,
    userId: number
}

export const toggleFollowIsFetching = (isFollowFetching: boolean, userId: number): ToggleFollowIsFetchingActionType => 
({type: IS_FOLLOW_FETCHING, isFollowFetching, userId})

export const requestUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {

    dispatch(togglePageIsFetching(true))
    dispatch(setCurrentPage(currentPage))

    let usersData = await usersAPI.getUsers(currentPage, pageSize)

    dispatch(togglePageIsFetching(false))
    dispatch(setUsers(usersData.items))
    dispatch(setTotalUsersCount(usersData.totalCount))
}

export const follow = (userId: number) => async (dispatch: any) => {
    dispatch(toggleFollowIsFetching(true, userId))

    let followResponse = await usersAPI.follow(userId)
    
    if (!followResponse.data.resultCode) {
        dispatch(followSuccess(userId))
    }

    dispatch(toggleFollowIsFetching(false, userId))
}

export const unfollow = (userId: number) => async (dispatch: any) => {
    dispatch(toggleFollowIsFetching(true, userId))

    let unfollowResponse = await usersAPI.unfollow(userId)

    if(!unfollowResponse.data.resultCode) {
        dispatch(unfollowSuccess(userId))
    }

    dispatch(toggleFollowIsFetching(false, userId))
}

export default usersReducer;