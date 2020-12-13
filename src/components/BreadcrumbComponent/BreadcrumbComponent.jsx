import React from 'react'
import classes from './BreadcrumbComponent.module.css'
import { Breadcrumb } from 'antd';


const BreadcrumbComponent = props => {
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default BreadcrumbComponent;