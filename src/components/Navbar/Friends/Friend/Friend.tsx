import React from 'react';
import { NavLink } from 'react-router-dom';

import s from'./Friend.module.css';
import { FriendType } from '../../../../types/types';

const Friend: React.FC<FriendType> = (props) => {
    return (
      <nav>
          <NavLink to = {`/friend/id${props.id}`} activeClassName = {s.activeLink}>
            <div className = {s.imgFriend}>
              <img src = {props.avatar} alt='your friend'/>
              <div>{props.name}</div>
            </div>
            </NavLink> 
      </nav>
    );
}

export default Friend;