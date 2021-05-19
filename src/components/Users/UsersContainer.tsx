import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, actions, requestUsers, FilterType } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import {
    getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getUsersFilter
} from '../../redux/users-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    currentPage: number 
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    setCurrentPage: (pageNumber: number) => void
}

type OwnPropsType = {
    title: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        let {currentPage, pageSize, filter} = this.props;
        this.props.requestUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        let {pageSize, filter} = this.props;
        this.props.requestUsers(pageNumber, pageSize, filter);
        this.props.setCurrentPage(pageNumber);
    }

    onFilterChanged = (filter: FilterType) => {
        let { pageSize } = this.props;
        this.props.requestUsers(1, pageSize, filter);
    }

    render() {
        return <>
            <h2>{this.props.title}</h2>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress} />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state),
    };
} 

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps, { follow, unfollow, setCurrentPage: actions.setCurrentPage, requestUsers }
    )
)(UsersContainer)