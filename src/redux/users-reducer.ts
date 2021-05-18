import { UserType } from './../types/types';
import { userAPI } from "../api/users-api";
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const TOGGLE_FOLLOW = 'SN/USERS/TOGGLE_FOLLOW';
const SET_USERS = 'SN/USERS/SET_USERS';
const SET_CURRENT_PAGE = 'SN/USERS/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SN/USERS/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'SN/USERS/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> //array of users's id 
};

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case TOGGLE_FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: !u.followed }
                    }
                    return u;
                })
            };

        case SET_USERS:
            return {
                ...state,
                users: action.users
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching 
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };

        default:
            return state;
    }
}

export const actions = {
    toggleFollowAC: (userId: number) => ({ type: TOGGLE_FOLLOW, userId } as const),

    setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users } as const),

    setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),

    setTotalUsersCount: (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount } as const),

    toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching } as const),

    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId } as const)
}

export const requestUsers = (page: number, pageSize: number) => async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(actions.toggleIsFetching(true));
    let data = await userAPI.getUsers(page, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
}

export const toggleFollow = async (dispatch: DispatchType, userId: number, apiMethod: any) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actions.toggleFollowAC(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => async (dispatch) => {
    toggleFollow(dispatch, userId, userAPI.follow.bind(userAPI));
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    toggleFollow(dispatch, userId, userAPI.unfollow.bind(userAPI));
}

export default usersReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>