import React from 'react';
import 'antd/dist/antd.css'
import { Menu, Layout, Button, Row, Col, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'

import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';

const { Header } = Layout;

export type MapPropsType = {
}

export const AppHeader: React.FC<MapPropsType> = (props) => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }
    return (
        <Header className="header">
            <Row>
            <Col span={18}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1"><Link to='/developers'>Developers</Link></Menu.Item>
                </Menu>
            </Col>
            {isAuth 
                ? 
                <>
                <Col span={1}>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />{login} 
                </Col> 
                <Col span={5}>
                    <Button onClick = {logoutCallback}>
                        Log out
                    </Button>
                </Col> 
            </>
                : <Col span={6}>
                    <Button>
                        <Link to = {'/login'}>
                            Login
                        </Link>
                    </Button>
                   </Col>
                }
            </Row>
        
        </Header>
        // <header className={s.header}>
        //     <img src="../../logo.png"
        //      alt = '' />
        //      <div className = {s.loginBlock} >
        //          {props.isAuth 
        //          ? <div>{props.login} 
        //          <button type="button" className="btn btn-outline-secondary" onClick = {props.logout}>
        //              Log out</button>
        //             </div> 
        //          : <NavLink to = {'/login'}><button type="button" className="btn btn-outline-secondary" onClick = {props.logout}>
        //          Login</button></NavLink>}
        //      </div>
        // </header>
    );
}
