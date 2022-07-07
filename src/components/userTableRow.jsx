import React from 'react'
import propTypes from 'prop-types'
import BookmarkIcon from './bookmarkIcon'
import UserQualities from './userQualities'

const UserTableRow = ({ 
    _id,
    name, 
    profession, 
    qualities, 
    completedMeetings, 
    rate, 
    bookmark,
    onDelete,
    onToggleBookmark
}) => {

    const handleToggleBookmark = (id) => {
        return onToggleBookmark(id)
    }

    return (
        <tr className="table-primary">
            <td className="table-primary">{name}</td>
            <td className="table-primary">
                <UserQualities {...qualities} />
            </td>
            <td className="table-primary">{profession.name}</td>
            <td className="table-primary">{completedMeetings}</td>
            <td className="table-primary">
                <BookmarkIcon
                    id={_id}
                    isBookmarked={bookmark}
                    onToggle={handleToggleBookmark}
                />
            </td>
            <td className="table-primary">{rate}</td>
            <td className="table-primary">
                <button
                    type="button"
                    onClick={() => onDelete(_id)}
                    className="btn btn-danger"
                >
                    Удалить
                </button>
            </td>
        </tr>
    )
}

UserTableRow.propTypes = {
    _id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    profession: propTypes.object.isRequired,
    qualities: propTypes.array.isRequired,
    completedMeetings: propTypes.number.isRequired,
    rate: propTypes.number.isRequired,
    bookmark: propTypes.bool.isRequired,
    onDelete: propTypes.func.isRequired,
    onToggleBookmark: propTypes.func.isRequired
}

export default UserTableRow
