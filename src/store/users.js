import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import { getAccessToken, getUserId, removeAuthData, setTokens } from '../services/localStorage.service'
import userService from '../services/user.service'
import generateAuthError from '../utils/generateAuthError'
import history from '../utils/history'
import randomInt from '../utils/randomInt'

const initialState = getAccessToken() 
    ? {
        entities: null,
        loading: true,
        error: null,
        auth: { 
            userId: getUserId(),
            logged: true
        },
        isDataLoaded: false
    }
    : {
        entities: null,
        loading: false,
        error: null,
        auth: null,
        isDataLoaded: false
    }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        usersRequested(state) {
            state.loading = true
        },
        usersRecieved(state, action) {
            state.entities = action.payload
            state.isDataLoaded = true
            state.loading = false
        },
        usersFailed(state, action) {
            state.error = action.payload
            state.loading = false
        },
        usersAuthSuccess(state, action) {
            if (state.error) state.error = null
            state.auth = {}
            state.auth.userId = action.payload
            state.auth.logged = true
        },
        usersAuthFailed(state, action) {
            state.error = action.payload
        },
        userCreated(state, action) {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        },
        userUpdated(state, action) {
            const idx = state.entities.findIndex((u) => u._id === action.payload._id)
            state.entities[idx] = action.payload
        },
        userUpdateFailed(state, action) {
            state.error = action.payload
        },
        userLoggedOut(state) {
            state.auth = null
            state.entities = null
            state.isDataLoaded = false
        }
    }
})

const { actions, reducer: userReducer } = userSlice

const { 
    usersRequested,
    usersRecieved, 
    usersFailed, 
    usersAuthSuccess, 
    usersAuthFailed, 
    userCreated,
    userUpdated,
    userUpdateFailed,
    userLoggedOut
} = actions

const authReuested = createAction('user/authReuested')
const userCreateRequested = createAction('user/createRequested')
const userUpdateRequested = createAction('user/updateRequested')

export const loadUsers = () => async (dispatch) => {
    dispatch(usersRequested())
    try {
        const { content } = await userService.fetchAll()
        dispatch(usersRecieved(content))
    } catch (error) {
        dispatch(usersFailed(error.message))
    }
}

export const updateUser = (data) => async (dispatch) => {
    dispatch(userUpdateRequested())
    try {
        const { content } = await userService.edit(data)
        dispatch(userUpdated(content))
        history.push(`/users/${content._id}`)
    } catch (error) {
        dispatch(userUpdateFailed(error.message))
    }
}

export const logOut = () => (dispatch) => {
    removeAuthData()
    dispatch(userLoggedOut())
    history.push('/')
}

export const login = ({ formData, redirect = '/' }) => async (dispatch) => {
    dispatch(authReuested())
    try {
        const { email, password } = formData
        const data = await authService.login(email, password)
        setTokens(data)
        dispatch(usersAuthSuccess(data.localId))
        history.push(redirect)
    } catch (error) {
        const { code, message } = error.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message)
            dispatch(usersAuthFailed(errorMessage))
        } else {
            dispatch(usersAuthFailed(message))
        }
    }
}

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authReuested())
    try {
        const data = await authService.register(email, password)
        setTokens(data)
        dispatch(usersAuthSuccess(data.localId))

        dispatch(userCreateRequested())
        const { content } = await userService.create({ 
            _id: data.localId,
            email,
            completedMeetings: randomInt(1, 100),
            rate: randomInt(1, 5),
            ...rest 
        })
        dispatch(userCreated(content))
        history.push('/users')
    } catch (error) {
        const errorMessage = generateAuthError(error)
        dispatch(usersAuthFailed(errorMessage))
    }
}

export const getAuthErrorMessage = () => (state) => state.users.error

export const getUsersList = () => (state) => state.users.entities

export const getUsersLoading = () => (state) => state.users.loading

export const getIsDataLoaded = () => (state) => state.users.isDataLoaded

export const getCurrentUserId = () => (state) => state.users.auth?.userId

export const getCurrentUserData = () => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === state.users.auth?.userId)
    }
}

export const getLogged = () => (state) => state.users.auth?.logged

export const getIsAuth = () => (state) => state.users.auth

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId)
    }
}

export default userReducer