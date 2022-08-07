import React, { useState, useEffect } from 'react'
import api from '../../api'
import validator from '../../utils/validator'
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelect from '../common/form/multiSelect'
import CheckboxField from '../common/form/checkboxField'

const RegisterForm = () => {
    const [formData, setFormData] = useState({ 
        email: '', 
        password: '', 
        profession: '',
        sex: 'male',
        qualities: '',
        license: false
    })
    const [errors, setErrors] = useState({})
    const [qualities, setQualities] = useState({})
    const [professions, setProfessions] = useState([])
    const isValid = Object.keys(errors).length

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
        api.qualities.fetchAll().then((data) => setQualities(data))
    }, [])

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
        },
        profession: { isRequired: { message: 'Не выбрана профессия' } },
        qualities: { isRequired: { message: 'Выберите хотя бы одно качество' } },
        license: { isRequired: { message: 'Согласитесь с лицензией' } }
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const isInvalid = validate()
        if (isInvalid) return
        console.log(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="has-validation shadow p-3">
            <TextField
                className="mt-2"
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

            <SelectField
                showLabel={false}
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                defaultOption="Выберите профессию"
                options={professions}
                error={errors?.profession?.message || ''} />

            <RadioField
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                options={[
                    { value: 'male', label: 'Муж.' },
                    { value: 'female', label: 'Жен.' }
                ]} />

            <MultiSelect
                name="qualities"
                onChange={handleChange}
                options={qualities}
                showLabel={false}
                error={errors?.qualities?.message || ''}
                placeholder="Ваши качества..." />

            <CheckboxField
                name="license"
                value={formData.license}
                onChange={handleChange}
                error={errors?.license?.message || ''}>
                <p className="mb-0">Даю согласие на обработку персональных данных</p>
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
 
export default RegisterForm
