import { userProfileAPI } from '../api/api'
import { UserProfileType } from '../types/types'
import { AppStateType } from '../redux/redux-store'
import { ThunkAction } from 'redux-thunk'

const SET_USER_PROFILE = 'SET_USER_PROFILE'
const IS_USER_PROFILE_FETCHING = 'IS_USER_PROFILE_FETCHING'
const SET_USER_STATUS = 'SET_STATUS'
const ADD_COMMENT = 'ADD_COMMENT'
 
let initialState = {
    posts: [
        {
            id: 1,
            message: 'Hello World',
            likesCount: 10
        },
        {
            id: 2,
            message: 'I love Typescript',
            likesCount: 50
        },
        {
            id: 3,
            message: 'My name is Alexander',
            likesCount: 100
        }
    ],
    userProfile: {} as UserProfileType,
    userStatus: '' as string | null,
    isUserProfileFetching: false
}

type InitialStateType = typeof initialState

type ActionsType = SetUserProfileActionType | SetIsUserProfileFetchingActionType | SetUserStatusActionType | AddCommentActionType

const userProfileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case SET_USER_PROFILE: {
            return {
                ...state,
                userProfile: action.userProfile
            }
        }
        case IS_USER_PROFILE_FETCHING: {
            return {
                ...state,
                isUserProfileFetching: action.isUserProfileFetching
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                userStatus: action.userStatus
            }
        }
        case ADD_COMMENT: {
            return {
                ...state,
                posts: [...state.posts, { id: state.posts.length + 1, message: action.comment, likesCount: 0 }]
            }
        }
    }
    return state
}

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    userProfile: UserProfileType
}

export const setUserProfile = (userProfile: UserProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, userProfile})

type SetIsUserProfileFetchingActionType = {
    type: typeof IS_USER_PROFILE_FETCHING
    isUserProfileFetching: boolean
}

export const setUserProfileFetching = (isUserProfileFetching: boolean): SetIsUserProfileFetchingActionType => 
({type: IS_USER_PROFILE_FETCHING, isUserProfileFetching})

type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS,
    userStatus: string | null
}

export const setUserStatus = (userStatus: string | null): SetUserStatusActionType => ({type: SET_USER_STATUS, userStatus})

type AddCommentActionType = {
    type: typeof ADD_COMMENT
    comment: string
}

export const addComment = (comment: string): AddCommentActionType => ({type: ADD_COMMENT, comment})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUserProfile = (userId: number): ThunkType => async (dispatch, getState) => {

    dispatch(setUserProfileFetching(true))

    let userStatus = await userProfileAPI.getStatus(userId)
    let userProfile = await userProfileAPI.getProfile(userId)

    dispatch(setUserStatus(userStatus)) 
    dispatch(setUserProfile(userProfile))
    dispatch(setUserProfileFetching(false))
}

export default userProfileReducer