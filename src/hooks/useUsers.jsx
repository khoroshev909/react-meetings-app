import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import propTypes from 'prop-types'
import userService from '../services/user.service'
import { useAuth } from './useAuth'

const UserContext = React.createContext()

export const useUsers = () => {
    return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { currentUser } = useAuth()

    function errorCatcher(error) {
        const { message } = error
        setError(message)
    }

    useEffect(() => {
        const newUsers = [...users]
        const idx = newUsers.findIndex((u) => u._id === currentUser._id)
        newUsers[idx] = currentUser
        setUsers(newUsers)
    }, [currentUser])
    
    const getUsers = async () => {
        try {
            const { content } = await userService.fetchAll()
            setUsers(content)
        } catch (error) {
            errorCatcher(error)
        } finally {
            setLoading(false)
        }
    }

    const getUserById = (id) => users.find((u) => u._id === id)

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
        <UserContext.Provider value={{ users, getUserById }}>
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
