import React, { FC, useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { AppStateType } from '../../../redux/redux-store'
import { UserProfileType, UserPostWallType } from '../../../types/types'
import { getUserProfile, addComment } from '../../../redux/user-profile-reducer'
import Profile from './Profile'

type MapStatePropsType = {
    userProfile: UserProfileType
    userStatus: string | null
    posts: Array<UserPostWallType>
    isUserProfileFetching: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    addComment: (comment: string) => void
}

type OwnPropsType = {

}

type PathParamsType = {
    userId: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & RouteComponentProps<PathParamsType>

const ProfileContainer: FC<PropsType> = ({userProfile, userStatus, posts, isUserProfileFetching, 
    getUserProfile, addComment, match: {params: {userId: userIdFromURL}}}) => {

    useEffect(() => {
        getUserProfile(Number(userIdFromURL))
    }, [])

    return (
        <Profile userProfile={userProfile}
                 userStatus={userStatus}
                 posts={posts}
                 addComment={addComment}/>
    )
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        userProfile: state.userProfile.userProfile,
        userStatus: state.userProfile.userStatus,
        isUserProfileFetching: state.userProfile.isUserProfileFetching,
        posts: state.userProfile.posts
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { getUserProfile, addComment }),
    withRouter)
    (ProfileContainer)