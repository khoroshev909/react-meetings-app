const JWT_TOKEN = 'jwt_token'
const REFRESH_TOKEN = 'refresh_token'
const EXPIRES_IN = 'expires_in'

export function setTokens({ idToken, refreshToken, expiresIn }) {
    // convert to ms
    const expiresVal = Date.now() + expiresIn * 1000

    localStorage.setItem(JWT_TOKEN, idToken)
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
    localStorage.setItem(EXPIRES_IN, expiresVal)
}

export function getAccessToken() {
    return localStorage.getItem(JWT_TOKEN)
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN)
}

export function getExpiresTime() {
    return localStorage.getItem(EXPIRES_IN)
}