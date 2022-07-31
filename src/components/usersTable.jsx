import React from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import Table from './table'
import BookmarkIcon from './bookmarkIcon'
import QualitiesList from './qualitiesList'

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
                <QualitiesList qualities={user.qualities} />
            )
        },
        profession: { path: 'profession.name', name: 'Профессия' },
        completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
        bookmark: { 
            path: 'bookmark', 
            name: 'Избранное',
            component: (user) => ( 
                <BookmarkIcon
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
                    className="btn btn-danger">
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
