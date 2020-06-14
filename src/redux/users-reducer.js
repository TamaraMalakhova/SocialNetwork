import { userAPI } from "../api/api";

const TOGGLE_FOLLOW = 'usersPage/TOGGLE_FOLLOW';
const SET_USERS = 'usersPage/SET_USERS';
const SET_CURRENT_PAGE = 'usersPage/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'usersPage/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'usersPage/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'usersPage/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {

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
                    : state.followingInProgress.filter(id => id != action.userId)
            };

        default:
            return state;
    }
}

export const toggleFollowAC = (userId) => ({ type: TOGGLE_FOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await userAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

export const toggleFollow = async (dispatch, userId, apiMethod) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode == 0) {
        dispatch(toggleFollowAC(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => async (dispatch) => {
    toggleFollow(dispatch, userId, userAPI.follow.bind(userAPI));
}

export const unfollow = (userId) => async (dispatch) => {
    toggleFollow(dispatch, userId, userAPI.unfollow.bind(userAPI));
}

export default usersReducer;