import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        entities: null,
        loading: true,
        error: null
    },
    reducers: {
        commentsRequested(state) {
            if (!state.loading) return
            state.error = null
            state.loading = true
        },
        commentsRecieved(state, action) {
            state.entities = action.payload
            state.loading = false
        },
        commentAddRequested(state) {
            state.error = null
        },
        commentAdd(state, action) {
            if (Array.isArray(state.entities)) {
                state.entities.push(action.payload)
            }
        },
        commentRemoveRequested(state) {
            state.error = null
        },
        commentRemove(state, action) {
            if (Array.isArray(state.entities)) {
                state.entities = state.entities.filter((c) => c._id !== action.payload)
            }
        },
        commentsFailed(state, action) {
            state.error = action.payload
            state.loading = false
        }       
    }
})

const { actions, reducer: commentReducer } = commentSlice

const { 
    commentsRequested,
    commentsRecieved,
    commentsFailed,
    commentAddRequested,
    commentAdd,
    commentRemoveRequested,
    commentRemove
} = actions

export const addComment = (newComment) => async (dispatch) => {
    dispatch(commentAddRequested())
    try {
        const { content } = await commentService.create(newComment)
        dispatch(commentAdd(content))
    } catch (error) {
        const { message } = error.response.data.error
        dispatch(commentsFailed(message))
    }
}

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commentRemoveRequested())
    try {
        await commentService.delete(commentId)
        dispatch(commentRemove(commentId))
    } catch (error) {
        const { message } = error.response.data.error
        dispatch(commentsFailed(message))
    }
}

export const loadComments = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.fetch(userId)
        dispatch(commentsRecieved(content))
    } catch (error) {
        dispatch(commentsFailed(error.message))
    }
}

export const getCommentsError = () => (state) => state.comments.error

export const getComments = () => (state) => state.comments.entities

export const getCommentsLoading = () => (state) => state.comments.loading

export default commentReducer
