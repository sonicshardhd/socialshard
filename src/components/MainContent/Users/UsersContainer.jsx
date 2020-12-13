import React, { useEffect } from 'react'
import Users from './Users'
import { connect } from 'react-redux'


const UsersContainer = props => {
    return (
        <Users />
    )
}

export default connect()(UsersContainer);