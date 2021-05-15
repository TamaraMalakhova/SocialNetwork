import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { PostType, ProfilePhotosType, ProfileType } from "../types/types";

const ADD_POST = 'profilePage/ADD-POST';
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE';
const SET_STATUS = 'profilePage/SET_STATUS';
const DELETE_POST = 'profilePage/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profilePage/SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: 'Hi everyone! It\'s my first post.', numberOfLikes: 8 },
        { id: 2, message: "How are you?", numberOfLikes: 15 },
        { id: 3, message: "What do you think about last events?", numberOfLikes: 21 },
        { id: 4, message: "What do you think about last events?", numberOfLikes: 3 },
        { id: 5, message: "Hi friends. Mail me.", numberOfLikes: 60 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {

        case ADD_POST:
            let newPost = {
                id: state.posts.length,
                message: action.newPostText,
                numberOfLikes: 0
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
            };

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            };

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            };

        default:
            return state;
    }
}

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    newPostText: string
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({ type: ADD_POST, newPostText });

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });

type SetStatusActionCreator = {
    type: typeof SET_STATUS
    status: string
}

export const setStatus = (status: string): SetStatusActionCreator => ({ type: SET_STATUS, status });

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}

export const deletePost = (postId: number): DeletePostActionType => ({ type: DELETE_POST, postId });

type SavePhotosSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: ProfilePhotosType
}

export const savePhotoSuccess = (photos: ProfilePhotosType): SavePhotosSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos });

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}


export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {

    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        let message = response.data.messages[0];
        let wrongNetwork = message
            .slice(
                message.indexOf('>') + 1,
                message.indexOf(')')
            )
            .toLocaleLowerCase();
        dispatch(stopSubmit('edit-profile', { 'contacts': { [wrongNetwork]: message } }));
        return Promise.reject(message);
    }
}

export default profileReducer;