import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilterType, requestUsers, actions, follow as followAC, unfollow as unfollowAC } from '../../redux/users-reducer'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors'

import Paginator from '../common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'

type PropsType = {}


export const Users: React.FC<PropsType> = () => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
        dispatch(actions.setCurrentPage(pageNumber))
    }  

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        dispatch(followAC(userId))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollowAC(userId))
    }

    return <div>

        <UsersSearchForm onFilterChanged={onFilterChanged} />

        <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
            pageSize={pageSize} onPageChanged={onPageChanged} />

        <div>
            {
                users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress}
                    follow={follow} unfollow={unfollow} />)
            }
        </div>
    </div>
}
