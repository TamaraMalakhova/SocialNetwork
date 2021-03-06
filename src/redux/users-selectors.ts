import { UserType } from "../types/types";
import { AppStateType } from "./redux-store";
import { FilterType } from "./users-reducer";

export const getUsers = (state: AppStateType): Array<UserType> => {
    return state.usersPage.users;
}

export const getPageSize = (state: AppStateType): number => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType): number => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType): number => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType): boolean => {
    return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType): Array<number> => {
    return state.usersPage.followingInProgress;
}

export const getUsersFilter= (state: AppStateType): FilterType => {
    return state.usersPage.filter;
}