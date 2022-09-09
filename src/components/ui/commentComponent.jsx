import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import dateFormat from '../../utils/dateFormat'
import { useUsers } from '../../hooks/useUsers'
import { useAuth } from '../../hooks/useAuth'

const CommentComponent = ({ comment, onRemoveComment }) => {
    
    const [user, setUser] = useState()
    const { getUserById } = useUsers()

    const { currentUser } = useAuth()

    useEffect(() => {
        setUser(getUserById(comment.userId))
    }, [])

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
                                        {currentUser._id === user._id && (
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