import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.jpg';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';
import agreeSmile from '../../../assets/gifs/agreeSmile.gif';
import disagreeSmile from '../../../assets/gifs/disagreeSmile.gif';

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
      <div className={s.descriptionBlock}>

        <div className={s.profilePhotoBlock}>
          <img src={profile.photos.large || userPhoto} alt='' />
          <div className={s.profilePhotoButton}>
            {isOwner && <input type='file' className="btn btn-outline-secondary" onChange={onMainPhotoSelected} />}
          </div>
        </div>

        {/* <ProfileStatusWithHooks status={status} updateStatus={updateStatus} /> */}

        {editMode
          ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
          : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}
            status={status} updateStatus={updateStatus} />}

      </div>
    </div>
  );
}

const ProfileData = ({ profile, isOwner, goToEditMode, status, updateStatus }) => {
  return <div className={s.profileInfo} >
    {isOwner &&
      <div className={s.btnEditProfileInfo}> 
      <button type="button" className="btn btn-outline-secondary" onClick={goToEditMode}>Edit</button> 
      </div>}
    <div>
      <div className={s.fullName}>
        <b>{profile.fullName} </b>
      </div>
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />

      <div className={s.mainInfo}>
        <div>
          <b>Looking for a job: </b><img src ={profile.lookingForAJob ? agreeSmile : disagreeSmile} alt="" />
        </div>
        {profile.lookingForAJob &&
          <div>
            <b>My professional skills: </b>{profile.lookingForAJobDescription}
          </div>}
        <div>
          <b>About me: </b>{profile.aboutMe}
        </div>
      </div>

    </div>
    <div className={s.contacts}>
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