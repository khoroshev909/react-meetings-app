import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import { getAccessToken, getExpiresTime, getRefreshToken, setTokens } from './localStorage.service'

const http = axios.create({ baseURL: configFile.baseEndpoint })

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url)
            config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json'

            if (getAccessToken() && getExpiresTime() < Date.now()) {
                const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_AUTH_KEY}`
                const payload = {
                    grant_type: 'refresh_token',
                    refresh_token: getRefreshToken()
                }
                const { data } = await axios.post(url, payload)
                setTokens({ 
                    idToken: data.access_token,
                    refreshToken: data.refresh_token,
                    localId: data.user_id,
                    expiresIn: data.expires_in
                })
            }

            const accessToken = getAccessToken()
            if (accessToken) {
                config.params = {
                    ...config.params,
                    auth: accessToken
                }
            }
            
            return config
        }
    },
    function (error) {
        return Promise.reject(error)
    }
)

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({ ...data[key] }))
        : data
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFirebase) {
            res.data = { content: transformData(res.data) }
            return res
        }
        return res
    },
    function (error) {
        const expextedErrors = error.response 
        && error.response.status >= 400 
        && error.response.status <= 500
        if (!expextedErrors) {
            console.log(error)
            toast.error('Something was wrong. Try it later')
        }

        return Promise.reject(error)
    }
)

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
}

export default httpService
