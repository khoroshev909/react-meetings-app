import React from 'react'
import { useSelector } from 'react-redux'
import propTypes from 'prop-types'
import dateFormat from '../../utils/dateFormat'
import { getCurrentUserId, getUserById } from '../../store/users'

const CommentComponent = ({ comment, onRemoveComment }) => {
    
    const user = useSelector(getUserById(comment.userId))

    const currentUserId = useSelector(getCurrentUserId())

    return (
        user ? (
            <div className="bg-light card-body mb-3">
                <div className="row">
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src="https://avatars.dicebear.com/api/avataaars/:seed.svg"
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1">
                                            <b>
                                                {user.name}
                                            </b>
                                            <span className="small">
                                                &nbsp;|&nbsp; 
                                                <small>
                                                    {dateFormat(comment.created_at)}
                                                </small>
                                            </span>
                                        </p>
                                        {currentUserId === user._id && (
                                            <button 
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                                type="button"
                                                onClick={() => onRemoveComment(comment._id)}>
                                                <i className="bi bi-x-lg" />
                                            </button>
                                        )}
                                    </div>
                                    <p className="small mb-0">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <h4>Loading</h4>
        )
    )
}

CommentComponent.propTypes = {
    comment: propTypes.object.isRequired,
    onRemoveComment: propTypes.func.isRequired
}

export default CommentComponent