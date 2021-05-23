import { UserType } from './../types/types';
import { userAPI } from "../api/users-api";
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ResponseType } from '../api/api';

const TOGGLE_FOLLOW = 'SN/USERS/TOGGLE_FOLLOW';
const SET_USERS = 'SN/USERS/SET_USERS';
const SET_CURRENT_PAGE = 'SN/USERS/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SN/USERS/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'SN/USERS/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS';
const SET_FILTER = 'SN/USERS/SET_FILTER'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, //array of users's id 
    filter: {
        term: '',
        friend: null as null | boolean,
    },
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

        case SET_FILTER:
            return {
                ...state,
                filter: action.payload
            }

        default:
            return state;
    }
}

export const actions = {
    toggleFollowAC: (userId: number) => ({ type: TOGGLE_FOLLOW, userId } as const),

    setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users } as const),

    setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),

    setFilter: (filter: FilterType) => ({type: SET_FILTER, payload: filter} as const),

    setTotalUsersCount: (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount } as const),

    toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching } as const),

    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId } as const)
}

export const requestUsers = (page: number, pageSize: number, filter: FilterType) => async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.setFilter(filter))
    let data = await userAPI.getUsers(page, pageSize, filter.term, filter.friend)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
}

export const toggleFollow = async (dispatch: DispatchType, userId: number, apiMethod: (userId: number) => Promise<ResponseType>) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actions.toggleFollowAC(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => async (dispatch) => {
    await toggleFollow(dispatch, userId, userAPI.follow.bind(userAPI));
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await toggleFollow(dispatch, userId, userAPI.unfollow.bind(userAPI));
}

export default usersReducer;

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsTypes<typeof actions>
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>