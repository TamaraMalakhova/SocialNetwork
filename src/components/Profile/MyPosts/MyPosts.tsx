import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
//import userPhoto from '../../../assets/images/user.jpg';
import AddPostForm, { AddPostFormValuesType } from './AddPostForm/AddPostForm'
import { PostType, ProfileType } from '../../../types/types';

export type MapPropsType = {
  posts: Array<PostType>
  profile: ProfileType
}

export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

  let posts = [...props.posts];

  let postsElements = posts
    .reverse()
    .map(p => 
      <Post 
        key={p.id} 
        message={p.message} 
        numberOfLikes={p.numberOfLikes}
        //photoMini={ props.profile.photos.small || userPhoto} 
        //userName={props.profile.fullName} 
      />
    );

  let addNewPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <AddPostForm onSubmit={addNewPost} />
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
}

const MyPostsMemorized = React.memo(MyPosts)

export default MyPostsMemorized;