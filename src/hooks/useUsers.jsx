import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import propTypes from 'prop-types'
import userService from '../services/user.service'

const UserContext = React.createContext()

export const useUsers = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    function errorCatcher(error) {
        const { message } = error
        setError(message)
    }

    const getUsers = async () => {
        try {
            const { content } = await userService.fetchAll()
            setUsers(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    useEffect(() => {
        getUsers()       
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }     
    }, [error])

    return (
        <UserContext.Provider value={{ users }}>
            {!loading ? children : <h4>Loading...</h4>}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node
    ])
}
