const JWT_TOKEN = 'jwt_token'
const REFRESH_TOKEN = 'refresh_token'
const EXPIRES_IN = 'expires_in'
const USER_ID = 'user-local-id'

export function setTokens({ idToken, refreshToken, localId, expiresIn }) {
    // convert to ms
    const expiresVal = Date.now() + expiresIn * 1000

    localStorage.setItem(USER_ID, localId)
    localStorage.setItem(JWT_TOKEN, idToken)
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
    localStorage.setItem(EXPIRES_IN, expiresVal)
}

export function removeAuthData() {
    localStorage.removeItem(USER_ID)
    localStorage.removeItem(JWT_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
    localStorage.removeItem(EXPIRES_IN)
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

export function getUserId() {
    return localStorage.getItem(USER_ID)
}