import React from 'react';

import s from'./Friends.module.css';
import Friend from './Friend/Friend';
import { FriendType } from '../../../types/types';

type PropsType = {
  friends: Array<FriendType>
}

const Friends: React.FC<PropsType> = (props) => {

  let friends = props.friends;

  let friendsElements = friends.map(f => <Friend key={f.id} id={f.id} avatar={f.avatar} name ={f.name}/>);

    return (
      <div className = {s.item}>
        {friendsElements}
      </div>
    );
}

export default Friends;