import React from 'react'
import { NavLink } from 'react-router-dom'

import Friends from './Friends/Friends'
import { FriendType } from '../../types/types'
import s from './Navbar.module.css'

type PropsType = {
  friends: Array<FriendType>
}

const Navbar: React.FC<PropsType> = (props) => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to='/profile' activeClassName={s.activeLink}>Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/dialogs' activeClassName={s.activeLink}>Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/users' activeClassName={s.activeLink}>Users</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/news' activeClassName={s.activeLink}>News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/music' activeClassName={s.activeLink}>Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to='/settings' activeClassName={s.activeLink}>Settings</NavLink>
      </div>
      <div className={s.item}>
        <div className={s.itemFriend}>
          <NavLink to='/friends' activeClassName={s.activeLink}>Friends</NavLink>
        </div>
        <Friends friends={props.friends} />

      </div>
    </nav>
  )
}

export default Navbar