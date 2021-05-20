import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return (
        <header className={s.header}>
            <img src="../../logo.png"
             alt = '' />
             <div className = {s.loginBlock} >
                 {props.isAuth 
                 ? <div>{props.login} 
                 <button type="button" className="btn btn-outline-secondary" onClick = {props.logout}>
                     Log out</button>
                    </div> 
                 : <NavLink to = {'/login'}><button type="button" className="btn btn-outline-secondary" onClick = {props.logout}>
                 Login</button></NavLink>}
             </div>
        </header>
    );
}

export default Header;