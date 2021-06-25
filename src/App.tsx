import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import { Layout, Menu, Breadcrumb, Avatar, Row, Col } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import NavbarContainer from './components/Navbar/NavbarContainer'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { UsersPage } from './components/Users/UsersContainer'
import { AppHeader } from './components/Header/Header'
import { LoginPage } from './components/Login/Login'
//import { ChatPage } from './pages/Chat/ChatPage'
import { connect } from 'react-redux'
import { initializeApp } from './redux/app-reducer'
import { compose } from 'redux'
import Preloader from './components/common/Preloader/Preloader'
import { withSuspense } from './hoc/withSuspense'
import { AppStateType } from './redux/redux-store'

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatContainer = React.lazy(() => import('./pages/Chat/ChatPage'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatContainer)

class App extends React.Component<MapPropsType & DispatchPropsType> {

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    //dispatch in globalError of App-reducer
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount(){
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <Layout>
    <AppHeader />
    <Content style={{ padding: '0 50px' }}>
      {/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            //defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
              <Menu.Item key="1">
                <Link to='/profile'>Profile</Link>
              </Menu.Item>
              <Menu.Item key="2">
              <Link to='/dialogs'>Messages</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
              <Menu.Item key="5">
                <Link to='/developers'>Developers</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Additional options">
              <Menu.Item key="9">
                <Link to='/chat'>Chat</Link>
              </Menu.Item>
              <Menu.Item key="10">
                <Link to='/news'>News</Link>
              </Menu.Item>
              <Menu.Item key="11">
                <Link to='/music'>Music</Link>
              </Menu.Item>
              <Menu.Item key="12">
                <Link to='/settings'>Settings</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
           <Switch>
            <Route exact path='/' render={ () => <Redirect to={'/profile'} />} />
            <Route path='/profile/:userId?' render={() => <SuspendedProfile/>} />
            <Route path='/dialogs' render={() => <SuspendedDialogs/>} />
            <Route path='/news' component={News} />
            <Route path='/music' component={Music} />
            <Route path='/settings' component={Settings} />
            <Route path='/developers' render={() => <UsersPage title="Users" />} />
            <Route path='/login' render={() => <LoginPage />} />
            <Route path='/chat' render={() => <SuspendedChatPage />} />
            <Route path = '*' render= {()=><div>404 NOT FOUND</div>} />
          </Switch>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Developers Social Network ©2021 Created by Tamara M.</Footer>
  </Layout>
      // <div className='app-wrapper'>
      //   <HeaderContainer />
      //   <NavbarContainer />

      //   <div className='app-wrapper-content'>
      //     <Switch>
      //     <Route exact path='/' render={ () => <Redirect to={'/profile'} />} />
      //     <Route path='/profile/:userId?' render={() => <SuspendedProfile/>} />
      //     <Route path='/dialogs' render={() => <SuspendedDialogs/>} />
      //     <Route path='/news' component={News} />
      //     <Route path='/music' component={Music} />
      //     <Route path='/settings' component={Settings} />
      //     <Route path='/users' render={() => <UsersPage title="Users" />} />
      //     <Route path='/login' render={() => <LoginPage />} />
      //     <Route path = '*' render= {()=><div>404 NOT FOUND</div>} />
      //     </Switch>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
