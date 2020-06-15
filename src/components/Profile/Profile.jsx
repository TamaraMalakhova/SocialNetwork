import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/Preloader/Preloader';

const Profile = (props) => {

  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div >
      <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}
        isOwner={props.isOwner} savePhoto = {props.savePhoto} saveProfile = {props.saveProfile} />
      <MyPostsContainer profile={props.profile} />
    </div>
  );
}

export default Profile;