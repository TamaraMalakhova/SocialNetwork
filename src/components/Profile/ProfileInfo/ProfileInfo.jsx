import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.jpg';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  let [editMode, setEditMode] = useState(false);

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false);
      }
    );
  }

  return (
    <div >
      <div className={s.background}>
        <img alt='' src='https://jssors8.azureedge.net/demos/image-slider/img/faded-monaco-scenery-evening-dark-picjumbo-com-image.jpg'></img>
      </div>

      <div className={s.descriptionBlock}>

        <div className={s.profilePhoto}>
          <img src={profile.photos.large || userPhoto} alt ='' />
          {isOwner && <input type='file' onChange={onMainPhotoSelected} />}
        </div>

        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />

        {editMode
          ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
          : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)} />}

      </div>
    </div>
  );
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return <div className={s.profileInfo} >
    {isOwner && <div> <button onClick={goToEditMode}>Edit</button> </div>}
    <div>
      <div className={s.fullName}>
        <b>Full name: </b>{profile.fullName}
      </div>

      <div>
        <b>Looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {profile.lookingForAJob &&
        <div>
          <b>My professional skills: </b>{profile.lookingForAJobDescription}
        </div>}
      <div>
        <b>About me: </b>{profile.aboutMe}
      </div>

    </div>
    <div>
      <b>Contacts: </b>
      {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })}
    </div>
  </div>
}


const Contact = ({ contactTitle, contactValue }) => {
  return <div className={s.contact}>
    <b> {contactTitle}: </b> {contactValue === null ? 'Not specified' : contactValue}
  </div>
}

export default ProfileInfo;