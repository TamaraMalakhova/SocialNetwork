import React from 'react';
import { connect } from 'react-redux'

import Header from './Header'
import { logout } from '../../redux/auth-reducer'
import { AppStateType } from '../../redux/redux-store'
import { MapPropsType, DispatchPropsType } from './Header'

class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {

    render(){
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { logout }) (HeaderContainer);