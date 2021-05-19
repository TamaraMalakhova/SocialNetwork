import React from 'react'
import { FilterType } from '../../redux/users-reducer'

import { UserType } from '../../types/types'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void 
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onFilterChanged: (filter: FilterType) => void
}


let Users: React.FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {

    return <div>

        <UsersSearchForm onFilterChanged={props.onFilterChanged} />

        <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
            pageSize={pageSize} onPageChanged={onPageChanged} />

        <div>
            {
                users.map(u => <User user={u} key={u.id} followingInProgress={props.followingInProgress}
                    follow={props.follow} unfollow={props.unfollow} />)
            }
        </div>
    </div>
}

export default Users