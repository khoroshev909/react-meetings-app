import React from 'react'
import propTypes from 'prop-types'
import BookmarkIcon from './bookmarkIcon'
import UserQualities from './userQualities'

const UserTableRow = ({ user, onDelete, onToggleBookmark }) => {

    return (
        <tr className="table-primary">
            <td className="table-primary">{user.name}</td>
            <td className="table-primary">
                <UserQualities {...user.qualities} />
            </td>
            <td className="table-primary">{user.profession.name}</td>
            <td className="table-primary">{user.completedMeetings}</td>
            <td className="table-primary">
                <BookmarkIcon
                    id={user._id}
                    isBookmarked={user.bookmark}
                    {...{ onToggleBookmark }}
                />
            </td>
            <td className="table-primary">{user.rate}</td>
            <td className="table-primary">
                <button
                    type="button"
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    Удалить
                </button>
            </td>
        </tr>
    )
}

UserTableRow.propTypes = {
    user: propTypes.object.isRequired,
    onDelete: propTypes.func.isRequired,
    onToggleBookmark: propTypes.func.isRequired
}

export default UserTableRow
