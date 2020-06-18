import React from 'react';
import userPhoto from '../../assets/images/user.jpg';
import s from './Users.module.css';
import { NavLink } from 'react-router-dom';

let User = ({ user, followingInProgress, unfollow, follow }) => {

    return <div key = {user.id}>
        <span>
            <NavLink to={'/profile/' + user.id} >
                <div className={s.userPhoto}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} 
                    alt='user'/>
                </div>
            </NavLink>
            <div>
                <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                    user.followed ? unfollow(user.id) : follow(user.id);
                }}>
                    {user.followed ? 'Unfollow' : 'Follow'}</button>
            </div>
        </span>

        <span>
            <span>
                <div>{user.name}</div>
                <div> {user.status} </div>
            </span>
            <span>
                <div> {'user.location.country'} </div>
                <div> {'user.location.city'} </div>
            </span>
        </span>

    </div>
}

export default User;