import React from 'react'
import propTypes from 'prop-types'
import dateFormat from '../../utils/dateFormat'

const CommentComponent = ({
    _id: commentId,
    content,
    userName,
    created_at: createdAt,
    onRemoveComment
}) => {
    return (
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
                                            {userName}
                                        </b>
                                        <span className="small">
                                            &nbsp;|&nbsp; 
                                            <small>
                                                {dateFormat(createdAt)}
                                            </small>
                                        </span>
                                    </p>
                                    <button 
                                        className="btn btn-sm text-primary d-flex align-items-center"
                                        type="button"
                                        onClick={() => onRemoveComment(commentId)}>
                                        <i className="bi bi-x-lg" />
                                    </button>
                                </div>
                                <p className="small mb-0">
                                    {content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CommentComponent.propTypes = {
    _id: propTypes.string.isRequired,
    content: propTypes.string.isRequired,
    userName: propTypes.string.isRequired,
    created_at: propTypes.string.isRequired,
    onRemoveComment: propTypes.func.isRequired
}

export default CommentComponent