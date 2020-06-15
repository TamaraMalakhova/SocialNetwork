import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null, then captcha is not required
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth, captchaUrl) => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth, captchaUrl }
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const getAuthUserData = () => async (dispatch) => {
    let data = await authAPI.me();
    if (data.resultCode === 0) {
        let { id, login, email } = data.data;
        dispatch(setAuthUserData(id, email, login, true, null));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === 10){
            dispatch(getCaptchaUrl());
        }

        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }));
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaURL();
    const captchaUrl = response.data.url; 
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;