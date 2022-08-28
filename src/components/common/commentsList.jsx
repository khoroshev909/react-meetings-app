import React from 'react'
import propTypes from 'prop-types'
import CommentComponent from '../ui/commentComponent'

const CommentsList = ({ comments, onRemoveComment }) => { 
    return (
        comments.length ? (
            comments.sort((prev, next) => { 
                return +next.created_at - +prev.created_at
            }).map((comment) => (
                <CommentComponent
                    key={comment._id}
                    comment={comment}
                    onRemoveComment={(commentId) => onRemoveComment(commentId)} />
            ))
        ) : (
            <h4>У вас пока нет комментрариев</h4> 
        )
    )
}

CommentsList.propTypes = {
    comments: propTypes.arrayOf(propTypes.object).isRequired,
    onRemoveComment: propTypes.func.isRequired
}
 
export default CommentsList