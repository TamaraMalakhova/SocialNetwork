import { BaseThunkType, InferActionsTypes } from './redux-store';
import { ResultCodeForCaptcha, ResultCodesEnum } from "../api/api";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'SN/AUTH/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null // if null, then captcha is not required
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

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

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string | null = null) => ({
        type: SET_USER_DATA,
        payload: { userId, email, login, isAuth, captchaUrl }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}} as const),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let data = await authAPI.me();
    if (data.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = data.data;
        dispatch(actions.setAuthUserData(id, email, login, true, null));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchIsRequired){
            dispatch(getCaptchaUrl());
        }

        let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { _error: message }));
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaURL();
    dispatch(actions.getCaptchaUrlSuccess(response.url));
}

export const logout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType <typeof stopSubmit>>