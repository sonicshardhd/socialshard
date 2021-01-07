import { usersAPI } from '../api/api'
import { UserType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from '../redux/redux-store'

const SET_USERS = 'SET_USERS'
const SET_PAGE_SIZE = 'SET_PAGE_SIZE'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const IS_PAGE_FETCHING = 'IS_PAGE_FETCHING'
const IS_FOLLOW_FETCHING = 'IS_FOLLOW_FETCHING'


const initialState = {
    users: [] as Array<UserType>,
    currentPage: 1,
    pageSize: 8,
    totalUsersCount: 0,
    isPageFetching: false,
    followingInProgress: [] as Array<number>
}

type InitialStateType = typeof initialState

type ActionsType = SetUsersActionType | SetPageSizeActionType | SetCurrentPageActionType | SetTotalUsersCountActionType |
FollowSuccessActionType | UnfollowSuccessActionType | TogglePageIsFetchingActionType | ToggleFollowIsFetchingActionType

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.pageSize
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        case IS_PAGE_FETCHING:
            return {
                ...state,
                isPageFetching: action.isPageFetching
            }
        case IS_FOLLOW_FETCHING:
            return {
                ...state,
                followingInProgress: action.isFollowFetching
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(userId => userId != action.userId)
            }
    }
    return state;
}


type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type SetPageSizeActionType = {
    type: typeof SET_PAGE_SIZE
    pageSize: number
}

export const setPageSize = (pageSize: number): SetPageSizeActionType => ({type: SET_PAGE_SIZE, pageSize})

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

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const requestUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch, getState) => {

    dispatch(togglePageIsFetching(true))
    dispatch(setCurrentPage(currentPage))

    let usersData = await usersAPI.getUsers(currentPage, pageSize)

    dispatch(togglePageIsFetching(false))
    dispatch(setUsers(usersData.items))
    dispatch(setTotalUsersCount(usersData.totalCount))
}

export const follow = (userId: number): ThunkType => async (dispatch, getState) => {
    dispatch(toggleFollowIsFetching(true, userId))

    let followResponse = await usersAPI.follow(userId)
    
    if (!followResponse.resultCode) {
        dispatch(followSuccess(userId))
    }

    dispatch(toggleFollowIsFetching(false, userId))
}

export const unfollow = (userId: number): ThunkType => async (dispatch, getState) => {
    dispatch(toggleFollowIsFetching(true, userId))

    let unfollowResponse = await usersAPI.unfollow(userId)

    if(!unfollowResponse.resultCode) {
        dispatch(unfollowSuccess(userId))
    }

    dispatch(toggleFollowIsFetching(false, userId))
}

export default usersReducer;