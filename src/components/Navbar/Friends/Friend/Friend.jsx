import React from 'react';
import s from'./Friend.module.css';
import { NavLink } from 'react-router-dom';

const Friend = (props) => {
    return (
      <nav>
          <NavLink to = {`/friend/id${props.id}`} activeClassName = {s.activeLink}>
            <div className = {s.imgFriend}>
              <img src = {props.avatar}></img>
              <div>{props.name}</div>
            </div>
            </NavLink> 
      </nav>
    );
}

export default Friend;