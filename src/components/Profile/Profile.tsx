import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import Preloader from '../common/Preloader/Preloader';
import { ProfileType } from '../../types/types';

type PropsType = {
  profile: ProfileType | null
  status: string
  isOwner: boolean
  updateStatus: (status: string) => void  
  savePhoto: (file: File) => void 
  saveProfile: (profile: ProfileType) => Promise<any> 
}

const Profile: React.FC<PropsType> = (props) => {

  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div >
      <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}
        isOwner={props.isOwner} savePhoto = {props.savePhoto} saveProfile = {props.saveProfile} />
      <MyPostsContainer 
        //profile={props.profile} 
      />
    </div>
  );
}

export default Profile;