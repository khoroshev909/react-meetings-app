import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import propTypes from 'prop-types'
import commentService from '../services/comment.service'

const CommentContext = React.createContext()

export const useComments = () => {
    return useContext(CommentContext)
}

export const CommentProvider = ({ children }) => {

    const { userId: pageId } = useParams()
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    function errorCatcher(error) {
        const { message } = error
        setError(message)
    }

    async function removeComment(id) {
        try {
            const { content } = await commentService.delete(id)
            if (content === null) {
                setComments((prevState) => prevState.filter((item) => item._id !== id))
            }
        } catch (error) {
            errorCatcher(error)
        }
    }

    async function addComment(body) {
        const { content } = await commentService.create(body)
        setComments((prevState) => [...prevState, content])
    }

    const getComments = async (pageId) => {
        try {
            const { content } = await commentService.fetch(pageId)
            setComments(content)
        } catch (error) {
            errorCatcher(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getComments(pageId)     
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }     
    }, [error])

    return (
        <CommentContext.Provider value={{ 
            comments,
            addComment,
            removeComment,
            loading
        }}>
            {children}
        </CommentContext.Provider>
    )
}

CommentProvider.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node
    ])
}
