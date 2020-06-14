import React from 'react';
import s from './Post.module.css';


const Post = ({message, numberOfLikes, photoMini}) => {
  return (
    <div className={s.item}>
      <div>
        <img src={photoMini} />
      </div>
      {message}
      <div className={s.likes}>
        <img src='https://vignette.wikia.nocookie.net/rutube9658/images/5/54/%D0%9B%D0%B0%D0%B9%D0%BA_TV_%D0%A8%D0%BE%D1%83.jpg/revision/latest/top-crop/width/360/height/450?cb=20181021193811&path-prefix=ru'></img>
        <span> {numberOfLikes} likes </span>
      </div>
    </div>
  );
}

export default Post;