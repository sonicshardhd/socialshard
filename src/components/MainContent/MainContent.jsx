import React from 'react'
import classes from './MainContent.module.css'
import withSuspense from '../hoc/WithSuspense/withSuspense'
import { Route } from 'react-router-dom'

const UsersContainer = React.lazy(() => import('./Users/UsersContainer.tsx'))
const ProfileContainer = React.lazy(() => import('./Profile/ProfileContainer'))

const MainContent = props => {
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Route path='/users' render={withSuspense(UsersContainer)} />
            <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
        </div>
    )
}

export default MainContent;