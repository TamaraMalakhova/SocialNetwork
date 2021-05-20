import React from 'react';
import './App.css';
import NavbarContainer from './components/Navbar/NavbarContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { UsersPage } from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { LoginPage } from './components/Login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import { withSuspense } from './hoc/withSuspense';
import { AppStateType } from './redux/redux-store';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

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
      <div className='app-wrapper'>
        <HeaderContainer />
        <NavbarContainer />

        <div className='app-wrapper-content'>
          <Switch>
          <Route exact path='/' render={ () => <Redirect to={'/profile'} />} />
          <Route path='/profile/:userId?' render={() => <SuspendedProfile/>} />
          <Route path='/dialogs' render={() => <SuspendedDialogs/>} />
          <Route path='/news' component={News} />
          <Route path='/music' component={Music} />
          <Route path='/settings' component={Settings} />
          <Route path='/users' render={() => <UsersPage title="Users" />} />
          <Route path='/login' render={() => <LoginPage />} />
          <Route path = '*' render= {()=><div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
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
