import React from 'react';
import s from './Post.module.css';

type PropsType = {
  message: string 
  numberOfLikes: number
  //photoMini: string
  //userName: string
}

const Post: React.FC<PropsType> = ({ message, numberOfLikes }) => {
  return (
    <div className={s.item}>
      {/* <div>
        <img src={photoMini} alt='' /> <b>{userName}</b>
      </div> */}
      <div className={s.postBody}>
        {message}
      </div>
      <div className={s.likes}>
        <img src='https://clck.ru/P5cTN' alt='like' />
        <span> {numberOfLikes} likes </span>
      </div>
    </div>
  );
}

export default Post;