import React, { useEffect, FC } from 'react'
import Users from './Users'
import { connect } from 'react-redux'
import { requestUsers, setPageSize, setCurrentPage, follow, unfollow } from '../../../redux/users-reducer'
import { Spin } from 'antd';
import { UserType } from '../../../types/types'
import { AppStateType } from '../../../redux/redux-store'

type MapStatePropsType = {
    users: Array<UserType>
    currentPage: number
    pageSize: number
    totalUsersCount: number
    followingInProgress: Array<number>
    isPageFetching: boolean
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    setPageSize: (pageSize: number) => void
    setCurrentPage: (currentPage: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

type OwnPropsType = {
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


const UsersContainer: FC<PropsType> = ({users, currentPage, pageSize, totalUsersCount, followingInProgress, isPageFetching,
    requestUsers, setPageSize, setCurrentPage, follow, unfollow}) => {

    useEffect(() => {
        requestUsers(currentPage, pageSize)
    }, [currentPage, pageSize])

    return (
        <>
        {
            isPageFetching
            ? <Spin tip="Loading..."><Users users={users}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalUsersCount={totalUsersCount}
                    followingInProgress={followingInProgress}
                    setPageSize={setPageSize}
                    setCurrentPage={setCurrentPage}
                    follow={follow}
                    unfollow={unfollow}/>
              </Spin>
            :<Users users={users}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalUsersCount={totalUsersCount}
                    followingInProgress={followingInProgress}
                    setPageSize={setPageSize}
                    setCurrentPage={setCurrentPage}
                    follow={follow}
                    unfollow={unfollow}/>

        }
        </>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: state.usersData.users,
        currentPage: state.usersData.currentPage,
        pageSize: state.usersData.pageSize,
        totalUsersCount: state.usersData.totalUsersCount,
        followingInProgress: state.usersData.followingInProgress,
        isPageFetching: state.usersData.isPageFetching
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, 
    {requestUsers, setPageSize, setCurrentPage, follow, unfollow})(UsersContainer);