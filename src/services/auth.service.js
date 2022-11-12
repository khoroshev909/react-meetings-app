import axios from 'axios'
import configFile from '../config.json'

axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1/'
const key = configFile.REACT_APP_FIREBASE_AUTH_KEY

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