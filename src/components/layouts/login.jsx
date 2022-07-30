import React, { useState, useEffect } from 'react'
import validator from '../../utils/validator'
import TextField from '../textField'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const isValid = Object.keys(errors).length

    const validateRules = {
        email: { 
            isRequired: { message: 'Электронная почта обязательна для заполнения' },
            isEmail: { message: 'Введите корректный Email' }
        },
        password: { 
            isRequired: { message: 'Пароль обязателен для заполнения' },
            hasCapital: { message: 'Введите как минимум одну заглавную букву' },
            hasDigit: { message: 'Введите как минимум одну цифру' },
            minLength: {
                message: 'Пароль должен быть не минее 4 символов',
                value: 4
            }
        }
    }

    const validate = () => {
        const newErrors = validator(formData, validateRules)
        setErrors(newErrors)
        return Object.keys(errors).length
    }

    useEffect(() => {
        validate()
    }, [formData])

    const handleChange = ({ target }) => {
        setFormData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isInvalid = validate()
        if (isInvalid) return
        console.log(formData)
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit} className="has-validation shadow p-3">
                        <h4 className="mb-3">Вход</h4>
                        <TextField
                            className="mt-2"
                            labelText="Почта"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors?.email?.message || ''} />

                        <TextField
                            labelText="Пароль"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors?.password?.message || ''} />

                        <button
                            className="btn btn-primary w-100 mt-3"
                            type="submit"
                            disabled={isValid}>
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}
 
export default Login