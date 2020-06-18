import React from 'react';
import s from './Post.module.css';


const Post = ({message, numberOfLikes, photoMini}) => {
  return (
    <div className={s.item}>
      <div>
        <img src={photoMini} alt=''/>
      </div>
      {message}
      <div className={s.likes}>
        <img src='https://clck.ru/P5cTN' alt ='like'/>
        <span> {numberOfLikes} likes </span>
      </div>
    </div>
  );
}

export default Post;