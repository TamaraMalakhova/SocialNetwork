import { profileAPI } from "../api/profile-api";
import { FormAction, stopSubmit } from "redux-form";
import { PostType, ProfilePhotosType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

const ADD_POST = 'SN/PROFILE/ADD-POST';
const SET_USER_PROFILE = 'SN/PROFILE/SET_USER_PROFILE';
const SET_STATUS = 'SN/PROFILE/SET_STATUS';
const DELETE_POST = 'SN/PROFILE/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SN/PROFILE/SAVE_PHOTO_SUCCESS';

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

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

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

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: ADD_POST, newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    deletePost: (postId: number) => ({ type: DELETE_POST, postId } as const),
    savePhotoSuccess: (photos: ProfilePhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos } as const),
}


export const addPostActionCreator = (newPostText: string) => ({ type: ADD_POST, newPostText });

export const setUserProfile = (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile });

export const setStatus = (status: string) => ({ type: SET_STATUS, status });

export const deletePost = (postId: number) => ({ type: DELETE_POST, postId });

export const savePhotoSuccess = (photos: ProfilePhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos });

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response));
}


export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {

    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.photos));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: any, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId));
        } else {
            throw new Error("userId can't be null")
        }
        
    } else {
        let message = response.messages[0];
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

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>