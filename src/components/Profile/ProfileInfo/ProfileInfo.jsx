import React from 'react';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.jpg';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }

  return (
    <div >
      <div className={s.background}>
        <img src='https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg'></img>
      </div>

      <div className={s.descriptionBlock}>

        <div classname={s.profilePhoto}>
          <img src={profile.photos.large || userPhoto} />
          {isOwner && <input type='file' onChange={onMainPhotoSelected} />}
        </div>
        {/* <ProfileStatus status = {props.status} updateStatus = {props.updateStatus} /> */}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        <div className={s.profileInfo} >
          <div className={s.fullName} >{profile.fullName}</div>
          <div>{profile.aboutMe}</div>
          <div>{profile.lookingForAJob}  {profile.lookingForAJobDescription}</div>
          <div>Contacts:</div>
          <div>Facebook: {profile.contacts.facebook === null ? 'Not specified' : profile.contacts.facebook} </div>
          <div>Website: {profile.contacts.website === null ? 'Not specified' : profile.contacts.website} </div>
          <div>VK: {profile.contacts.vk === null ? 'Not specified' : profile.contacts.vk} </div>
          <div>Twitter: {profile.contacts.twitter === null ? 'Not specified' : profile.contacts.twitter} </div>
          <div>Instagram: {profile.contacts.instagram === null ? 'Not specified' : profile.contacts.instagram} </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;