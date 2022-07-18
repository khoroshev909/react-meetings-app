import React from 'react'
import propTypes from 'prop-types'

const BookmarkIcon = ({ id, isBookmarked, onToggleBookmark }) => {
    return (
        <button 
            type="button" 
            onClick={() => onToggleBookmark(id)}>
            <i className={isBookmarked === false ? 'bi bi-bookmark' : 'bi bi-bookmark-fill'} />
        </button>
    )
}

BookmarkIcon.propTypes = {
    id: propTypes.string.isRequired,
    isBookmarked: propTypes.bool.isRequired,
    onToggleBookmark: propTypes.func.isRequired 
}

export default BookmarkIcon
