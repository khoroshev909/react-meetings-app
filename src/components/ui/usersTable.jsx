import React from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import Table from '../common/table'
import Qualities from '../common/quality'
import Bookmark from '../common/bookmark'

const UsersTable = ({ users, loading, selectedSort, onDelete, onSort, onToggleBookmark }) => {

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
                <Qualities qualities={user.qualities} />
            )
        },
        profession: { path: 'profession.name', name: 'Профессия' },
        completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
        bookmark: { 
            path: 'bookmark', 
            name: 'Избранное',
            component: (user) => ( 
                <Bookmark
                    id={user._id}
                    isBookmarked={user.bookmark}
                    {...{ onToggleBookmark }} />
            )
        },
        rate: { path: 'rate', name: 'Оценка' },
        delete: { 
            path: null,
            name: 'Действие',
            component: (user) => (
                <button
                    type="button"
                    onClick={() => onDelete(user._id)}
                    className="btn btn-info">
                    Удалить
                </button>
            )
        }
    }
    
    return ( 
        <Table {...{ users, loading, selectedSort, columns, onSort }} />
    )
}

UsersTable.propTypes = {
    users: propTypes.array.isRequired,
    loading: propTypes.bool.isRequired,
    onToggleBookmark: propTypes.func.isRequired,
    onDelete: propTypes.func.isRequired,
    onSort: propTypes.func.isRequired,
    selectedSort: propTypes.object.isRequired
}
 
export default UsersTable
