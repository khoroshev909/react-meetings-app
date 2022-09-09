import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import propTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { getUserId, removeAuthData, setTokens } from '../services/localStorage.service'
import randomInt from '../utils/randomInt'

const httpAuth = axios.create()

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [error, setError] = useState(null)
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    function errorCatcher(error) {
        const { message } = error
        setError(message)
    }

    async function getUserdata(userId = null) {
        try {
            const { content } = await userService.fetchById(userId)
            setCurrentUser(content)
        } catch (error) {
            errorCatcher(error)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        if (getUserId()) {
            getUserdata()
        } else {
            setLoading(false)
        }
    }, [])

    async function createUser(payload) {
        try {
            const { content } = await userService.create(payload)
            return content
        } catch (error) {
            errorCatcher(error)
        }
    }

    const updateUser = async (data) => {
        try {
            const { content } = await userService.edit(data)
            setCurrentUser(content)
            return content
        } catch (error) {
            errorCatcher(error)
        } finally {
            setLoading(false)
        }
    }

    async function login({ email, password }) {
        const key = process.env.REACT_APP_FIREBASE_AUTH_KEY
        const api = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`

        try {
            const { data } = await httpAuth.post(api, { email, password, returnSecureToken: true })
            setTokens(data)
            await getUserdata(data.localId)
            return data
        } catch (error) {
            errorCatcher(error)
            const { message, code } = error.response.data.error
            if (code === 400) {
                if (message === 'INVALID_PASSWORD') {
                    const errorObj = { password: { message: 'Неверный пароль' } }
                    throw errorObj
                } 
                if (message === 'EMAIL_NOT_FOUND') {
                    const errorObj = { email: { message: 'Пользователь не найден' } }
                    throw errorObj
                }
            }
        }
    }

    function logOut() {
        removeAuthData()
        setCurrentUser()
        history.push('/')
    }

    async function signUp({ email, password, ...rest }) {
        const key = process.env.REACT_APP_FIREBASE_AUTH_KEY
        const api = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`

        try {
            const { data } = await httpAuth.post(api, { 
                email,
                password,
                returnSecureToken: true
            })

            setTokens(data)

            const user = await createUser({ 
                _id: data.localId,
                email,
                completedMeetings: randomInt(1, 100),
                rate: randomInt(1, 5),
                ...rest 
            })

            setCurrentUser(user)
            return data
        } catch (error) {
            errorCatcher(error)
            const { message, code } = error.response.data.error
            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObj = { email: { message: 'Пользователь с таким Email уже существует' } }
                    throw errorObj
                } 
            }
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast.error(error)
            setError(null)
        }     
    }, [error])

    return (
        <AuthContext.Provider value={{ signUp, login, logOut, currentUser, updateUser }}>
            { loading ? <h4>Loading...</h4> : children }
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node
    ])
}
