import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import { useComments } from '../../hooks/useComments'
import CommentsList from '../common/commentsList'
import AddCommentForm from '../common/form/addCommentForm'
import { getCurrentUserId } from '../../store/users'

const Comments = () => {

    const { userId } = useParams()
    const currentUserId = useSelector(getCurrentUserId())

    const { addComment, comments, removeComment, loading: commentsLoading } = useComments()
                 
    const handleRemoveComment = (commentId) => {
        removeComment(commentId)
    }

    const handleAddComment = (newComment) => {
        addComment({ 
            ...newComment,
            _id: nanoid(),
            userId: currentUserId,
            pageId: userId,
            created_at: Date.now(),
            updated_at: Date.now()
        })
    }

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm
                        onAddComment={handleAddComment} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>
                        Comments
                    </h2>
                    <hr />
                    {!commentsLoading ? (
                        <CommentsList
                            comments={comments}
                            onRemoveComment={handleRemoveComment} />
                    ) : (
                        <h4>Loading</h4>
                    )}
                </div>
            </div>
        </>
    )
}
  
export default Comments