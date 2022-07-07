import React from 'react'
import propTypes from 'prop-types'

const BookmarkIcon = ({ id, isBookmarked, onToggle }) => {
    return (
        <button 
            type="button" 
            onClick={() => onToggle(id)}>
            <i className={isBookmarked === false ? 'bi bi-bookmark' : 'bi bi-bookmark-fill'} />
        </button>
    )
}

BookmarkIcon.propTypes = {
    id: propTypes.string.isRequired,
    isBookmarked: propTypes.bool.isRequired,
    onToggle: propTypes.func.isRequired 
}

export default BookmarkIcon
