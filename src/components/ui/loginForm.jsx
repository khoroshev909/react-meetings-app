import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import validator from '../../utils/validator'
import CheckboxField from '../common/form/checkboxField'
import TextField from '../common/form/textField'

const LoginForm = () => {
    const [formData, setFormData] = useState({ 
        email: '',
        password: '',
        stayAuth: false
    })
    const [errors, setErrors] = useState({})
    const isValid = Object.keys(errors).length

    const history = useHistory()

    const { login } = useAuth()

    const validateRules = {
        email: { 
            isRequired: { message: 'Введите ваш Email' },
            isEmail: { message: 'Введите корректный Email' }
        },
        password: { 
            isRequired: { message: 'Введите пароль' },
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

    const handleChange = (target) => {
        setFormData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isInvalid = validate()
        if (isInvalid) return

        try {
            await login(formData)
            history.push('/')
        } catch (error) {
            setErrors(error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="has-validation shadow p-3">
            <TextField
                label="Почта"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors?.email?.message || ''} />

            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors?.password?.message || ''} />

            <CheckboxField
                name="stayAuth"
                value={formData.stayAuth}
                onChange={handleChange}
                hasValidation={false}>
                <p className="mb-0">Оставаться в системе</p>
            </CheckboxField>

            <button
                className="btn btn-primary w-100 mt-3"
                type="submit"
                disabled={isValid}>
                Войти
            </button>
        </form>
    )
}
 
export default LoginForm