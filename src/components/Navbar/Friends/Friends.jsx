import React from 'react';
import s from'./Friends.module.css';
import Friend from './Friend/Friend';

const Friends = (props) => {

  let friends = props.friends;
  //let friends= [props.friends[0], props.friends[1], props.friends[2]]; 

  let friendsElements = friends.map(f => <Friend id={f.id} avatar={f.avatar} name ={f.name}/>);

    return (
      <div className = {s.item}>
        {friendsElements}
      </div>
    );
}

export default Friends;