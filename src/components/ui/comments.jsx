import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'
import CommentsList from '../common/commentsList'
import AddCommentForm from '../common/form/addCommentForm'
import { getCurrentUserId } from '../../store/users'
import { addComment, getComments, getCommentsError, getCommentsLoading, loadComments, removeComment } from '../../store/comments'

const Comments = () => {
    const dispatch = useDispatch()

    const { userId } = useParams()
    const currentUserId = useSelector(getCurrentUserId())

    const errorMessage = useSelector(getCommentsError())

    useEffect(() => {
        toast.error(errorMessage)
    }, [errorMessage])

    useEffect(() => {
        dispatch(loadComments(userId))
    }, [userId])

    const comments = useSelector(getComments())

    const commentsLoading = useSelector(getCommentsLoading())
 
    const handleRemoveComment = (commentId) => {
        dispatch(removeComment(commentId))
    }

    const handleAddComment = (newComment) => {
        dispatch(addComment({
            ...newComment,
            _id: nanoid(),
            userId: currentUserId,
            pageId: userId,
            created_at: Date.now(),
            updated_at: Date.now()
        }))
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