import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
import CommentsList from '../common/commentsList'
import AddCommentForm from '../common/form/addCommentForm'

const Comments = () => {

    const { userId } = useParams()

    const [users, setUsers] = useState()
    const [comments, setComments] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
    }, [])
                 
    const handleRemoveComment = (commentId) => {
        api.comments.remove(commentId)
            .then(() => {
                const newComments = comments.filter((c) => c._id !== commentId)
                setComments(newComments)
            })
    }

    const handleAddComment = (newComment) => {
        api.comments.add({ ...newComment, pageId: userId }).then((comment) => {
            setComments((prevState) => [
                ...prevState,
                comment
            ])
        })
    }

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    {users ? (
                        <AddCommentForm
                            users={users}
                            onAddComment={handleAddComment} />
                    ) : (
                        <h4>Loading</h4>
                    )}
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>
                        Comments
                    </h2>
                    <hr />
                    {comments ? (
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