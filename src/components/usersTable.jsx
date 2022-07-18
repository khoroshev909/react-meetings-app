import React from 'react'
import propTypes from 'prop-types'
import Table from './table'
import BookmarkIcon from './bookmarkIcon'
import QualitiesList from './qualitiesList'

const UsersTable = ({ users, selectedSort, onDelete, onSort, onToggleBookmark }) => {

    const columns = {
        name: { path: 'name', name: 'Имя' },
        qualities: { 
            path: null,
            name: 'Качества',
            component: (user) => (
                <QualitiesList {...user.qualities} />
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
        <Table {...{ users, selectedSort, columns, onSort }} />
    )
}

UsersTable.propTypes = {
    users: propTypes.array.isRequired,
    onToggleBookmark: propTypes.func.isRequired,
    onDelete: propTypes.func.isRequired,
    onSort: propTypes.func.isRequired,
    selectedSort: propTypes.object.isRequired
}
 
export default UsersTable
