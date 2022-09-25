import axios from 'axios'

axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1/'
const key = process.env.REACT_APP_FIREBASE_AUTH_KEY

const authService = {
    register: async (email, password) => {
        const { data } = await axios.post(`accounts:signUp?key=${key}`, {
            email,
            password,
            returnSecureToken: true
        })
        return data
    },
    login: async (email, password) => {
        const { data } = await axios.post(`accounts:signInWithPassword?key=${key}`, {
            email,
            password,
            returnSecureToken: true
        })
        return data
    }
}

export default authService