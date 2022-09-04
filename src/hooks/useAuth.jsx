import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import propTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { setTokens } from '../services/localStorage.service'

const httpAuth = axios.create()

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [error, setError] = useState(null)
    const [currentUser, setCurrentUser] = useState({})

    function errorCatcher(error) {
        const { message } = error
        setError(message)
    }

    async function createUser(payload) {
        try {
            const content = await userService.create(payload)
            return content
        } catch (error) {
            errorCatcher(error)
        }
    }

    async function login({ email, password }) {
        const key = process.env.REACT_APP_FIREBASE_AUTH_KEY
        const api = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`

        try {
            const { data } = await httpAuth.post(api, { email, password, returnSecureToken: true })
            setTokens(data)
            setCurrentUser(data)
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

    async function signUp({ email, password }) {
        const key = process.env.REACT_APP_FIREBASE_AUTH_KEY
        const api = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`

        try {
            const { data } = await httpAuth.post(api, { email, password, returnSecureToken: true })
            await createUser({ ...data, _id: data.localId, email })
            setTokens(data)
            setCurrentUser(data)
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
        <AuthContext.Provider value={{ signUp, login, currentUser }}>
            { children }
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node
    ])
}
