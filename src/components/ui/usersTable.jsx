import React from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import Table from '../common/table'
import Bookmark from '../common/bookmark'
import { QualitiesBadges } from '../common/quality'
import Profession from '../common/profession'

const UsersTable = ({ users, selectedSort, onSort }) => {
    
    const columns = {
        name: { 
            path: 'name',
            name: 'Имя',
            component: (user) => (
                <Link to={`users/${user._id}`}>
                    {user.name}
                </Link>
            )
        },
        qualities: { 
            path: null,
            name: 'Качества',
            component: (user) => (
                <QualitiesBadges qualitiesIds={user.qualities} />
            )
        },
        profession: { 
            name: 'Профессия',
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
        bookmark: { 
            path: 'bookmark', 
            name: 'Избранное',
            component: (user) => {
                const isBookmarked = localStorage.getItem(`bookmark-${user._id}`) ? true : false
                return (
                    <Bookmark
                        id={user._id}
                        isBookmarked={isBookmarked} />
                )
            }
        },
        rate: { path: 'rate', name: 'Оценка' }
    }
    
    return ( 
        <Table {...{ users, selectedSort, columns, onSort }} />
    )
}

UsersTable.propTypes = {
    users: propTypes.array.isRequired,
    onToggleBookmark: propTypes.func.isRequired,
    onSort: propTypes.func.isRequired,
    selectedSort: propTypes.object.isRequired
}
 
export default UsersTable
