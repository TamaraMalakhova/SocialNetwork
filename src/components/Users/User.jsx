import React from 'react';
import userPhoto from '../../assets/images/user.jpg';
import s from './Users.module.css';
import { NavLink } from 'react-router-dom';

let User = ({ user, followingInProgress, unfollow, follow }) => {

    return <div key = {user.id} className={s.userCard}>
        <span>
            <NavLink to={'/profile/' + user.id} >
                <div className={s.userPhoto}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} 
                    alt='user'/>
                </div>
            </NavLink>
            <div className={s.buttonFollow}>
                <button type="button" className="btn btn-outline-secondary" disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                    user.followed ? unfollow(user.id) : follow(user.id);
                }}>
                    {user.followed ? 'Unfollow' : 'Follow'}</button>
            </div>
        </span>

        <span>
            <span className={s.userInfo}>
                <div><b>{user.name}</b></div>
                <div> {user.status} </div>
            </span>
        </span>

    </div>
}

export default User;