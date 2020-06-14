import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCrator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCrator(10);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name='newPostText' placeholder='Enter your post'
          validate={[required, maxLength10]} />
      </div>
      <div className={s.buttonNewPost}>
        <button>Add post</button>
      </div>
    </form>
  );
}

const AddNewPostFormRedux = reduxForm({ form: 'profileAddPostForm' })(AddNewPostForm);

const MyPosts = React.memo((props) => {

  let posts = [...props.posts];

  let newPostElement = React.createRef();
  let postsElements = posts
    .reverse()
    .map(p => <Post message={p.message} numberOfLikes={p.numberOfLikes} />);

  let addNewPost = (values) => {
    props.addPost(values.newPostText);
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <AddNewPostFormRedux onSubmit={addNewPost} />
      </div>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  );
})

export default MyPosts;