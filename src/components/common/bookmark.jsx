import React, { useState } from 'react'
import propTypes from 'prop-types'

const Bookmark = ({ id, isBookmarked }) => {

    const [bookmarkState, setBookmarkState] = useState(isBookmarked || false)

    const handleToggleBookmark = () => {
        if (isBookmarked) {
            localStorage.removeItem(`bookmark-${id}`)
            setBookmarkState(false)
        } else {
            localStorage.setItem(`bookmark-${id}`, true)
            setBookmarkState(true)
        }
    }

    return (
        <button 
            type="button" 
            onClick={() => handleToggleBookmark(id)}>
            <i className={bookmarkState === false ? 'bi bi-bookmark' : 'bi bi-bookmark-fill'} />
        </button>
    )
}

Bookmark.propTypes = {
    id: propTypes.string.isRequired,
    isBookmarked: propTypes.bool.isRequired
}

export default Bookmark
