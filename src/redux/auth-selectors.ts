import { AppStateType } from "./redux-store";

export const selectIsAuth = (state: AppStateType): Boolean => {
    return state.auth.isAuth;
}

export const selectCurrentUserLogin = (state: AppStateType): String | null=> {
    return state.auth.login;
}