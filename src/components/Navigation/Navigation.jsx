import React, { useState } from 'react'
import classes from './Navigation.module.css'
import { Layout, Menu } from 'antd';
import { PicLeftOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';


const { Sider } = Layout;
const { SubMenu } = Menu;

const Navigation = props => {

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = () => {
        setCollapsed(collapsed => !collapsed)
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<UserOutlined />}>
                    Sign In
            </Menu.Item>
                <SubMenu key="sub1" icon={<PicLeftOutlined />} title="Navigation">
                        <Menu.Item key="2">
                            <NavLink to='/profile'>My Profile</NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to='/messages'>Messages</NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <NavLink to='/users'>Users</NavLink>
                        </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
}

export default Navigation;
