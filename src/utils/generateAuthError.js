export default function generateAuthError(message) {
    switch (message) {
    case 'EMAIL_EXISTS':
        return 'Пользователь с таким email уже существует'
    case 'INVALID_PASSWORD':
        return 'Неверный пароль'
    case 'EMAIL_NOT_FOUND':
        return 'Пользователь с таким email не найден'
    default:
        return 'Слишком много попыток входа. Попробуйте позже'
    }
}