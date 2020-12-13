import React from 'react'
import classes from './MainContent.module.css'
import Users from './Users/Users'
import { Route } from 'react-router-dom'


const MainContent = props => {
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Route path='/users' render={() => <Users />} />
        </div>
    )
}

export default MainContent;