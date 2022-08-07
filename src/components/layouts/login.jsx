import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginForm from '../ui/loginForm'
import RegisterForm from '../ui/registerForm'

const Login = () => {
    const { type } = useParams()
    const [formType, setFormType] = useState(type === 'login' ? 'login' : 'register')

    const handleTogglePage = () => {
        setFormType((prevState) => prevState === 'login' ? 'register' : 'login')
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {formType === 'login' ? (
                        <>
                            <h4 className="mb-3">Вход</h4>
                            <LoginForm />
                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <p>У вас ещё нет аккаунта?</p>
                                <button
                                    type="button"
                                    className="btn btn-link btn-sm mb-3 shadow-none"
                                    onClick={handleTogglePage}>
                                    Зарегистрироваться
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h4 className="mb-3">Регистрация</h4>
                            <RegisterForm />
                            <div className="d-flex align-items-center justify-content-center mt-2">
                                <p>Уже есть аккаунт?</p>
                                <button
                                    type="button"
                                    className="btn btn-link btn-sm mb-3 shadow-none"
                                    onClick={handleTogglePage}>
                                    Войти
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
 
export default Login