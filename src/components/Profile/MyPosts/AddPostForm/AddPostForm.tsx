import React from 'react';
import s from '../MyPosts.module.css';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { required, maxLengthCrator } from '../../../../utils/validators/validators';
import { createField, GetStringKeys, Textarea } from '../../../common/FormsControls/FormsControls';


const maxLength100 = maxLengthCrator(100);

type PropsType = {}

export type AddPostFormValuesType = {
  newPostText: string
}

type  AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddPostFormValuesTypeKeys>('Enter your post', 'newPostText', [required, maxLength100], Textarea)}
      </div>
      <div className={s.buttonNewPost}>
        <button>Add post</button>
      </div>
    </form>
  );
}

export default reduxForm<AddPostFormValuesType, PropsType>({ form: 'profileAddPostForm' })(AddNewPostForm);