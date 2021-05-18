import { connect } from 'react-redux';

import { actions } from '../../../redux/profile-reducer';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts';
import { AppStateType } from '../../../redux/redux-store';

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  } as MapPropsType
}

const MyPostsContainer = connect(mapStateToProps, {
  addPost: actions.addPostActionCreator
} as DispatchPropsType)(MyPosts);

export default MyPostsContainer;