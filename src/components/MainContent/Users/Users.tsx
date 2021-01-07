import React, { FC } from 'react'
import classes from './Users.module.css'
import { List, Card, Button, Space, Pagination } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../../types/types'

const { Meta } = Card;

type PropsType = {
    users: Array<UserType>
    currentPage: number
    pageSize: number
    totalUsersCount: number
    followingInProgress: Array<number>
    setPageSize: (size: number) => void
    setCurrentPage: (page: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: FC<PropsType> = ({users, currentPage, pageSize, totalUsersCount, followingInProgress, 
setPageSize, setCurrentPage, follow, unfollow}) => {

    const onSetPage = (page: number): any => {
        setCurrentPage(page)
    }

    const onSetPageSize = (current: number, size: number) => {
        setPageSize(size)
    }

    return (
        <>
            <Pagination style={{ margin: '16px 16px' }}
                showQuickJumper
                current={currentPage}
                total={totalUsersCount}
                showTotal={total => `Total ${total} items`}
                pageSizeOptions={['8', '12', '16']} 
                onChange={onSetPage}
                onShowSizeChange={onSetPageSize}/>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={users}
                renderItem={user => (
                    <List.Item>
                        <Card actions={[
                            user.followed
                            ? <Button type="primary" 
                                      loading={followingInProgress.some(id => user.id === id)}
                                      onClick={() => unfollow(user.id)}>Unfollow
                              </Button>
                            : <Button type="primary" 
                                      loading={followingInProgress.some(id => user.id === id)}
                                      onClick={() => follow(user.id)}>Follow
                              </Button>,
                            <Button type="primary" loading={false}>
                                <NavLink to={`/profile/${user.id}`}>Profile Page</NavLink>
                            </Button>

                        ]}
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src={user.photos.small || "https://place-hold.it/300x200"} />}
                        >
                            <Meta title={user.name} description={`Status: ${user.status || 'No status found'}`} />
                            <p>No status found</p>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
}

export default Users;