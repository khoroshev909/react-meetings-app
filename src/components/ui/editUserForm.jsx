import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import propTypes from 'prop-types'
import api from '../../api'
import TextField from '../common/form/textField'
import validator from '../../utils/validator'
import RadioField from '../common/form/radioField'
import SelectField from '../common/form/selectField'
import MultiSelect from '../common/form/multiSelect'

const EditUserForm = ({ user, professions, qualities }) => {

    const [formData, setFormData] = useState({
        _id: user._id,
        name: user.name,
        email: user.email,
        sex: user.sex,
        profession: user.profession,
        qualities: user.qualities
    })
    const [errors, setErrors] = useState({})
    const history = useHistory()

    const backToUserPage = () => {
        history.push(`/users/${user._id}`)
    }

    const validateRules = {
        name: { 
            isRequired: { message: 'Введите имя' },
            minLength: { 
                message: 'Введите минимум 3 символа',
                value: 3
            }
        },
        email: { 
            isRequired: { message: 'Введите Email' },
            isEmail: { message: 'Введите корректный Email' }
        },
        profession: { isRequired: { message: 'Не выбрана профессия' } },
        qualities: { isRequired: { message: 'Выберите хотя бы одно качество' } }
    }

    const validate = () => {
        const newErrors = validator(formData, validateRules)
        setErrors(newErrors)
        return Object.keys(errors).length
    }
    
    useEffect(() => {
        validate()
    }, [formData])

    const getProfessionById = () => professions.find((p) => p._id === formData.profession)
    const getQualities = (items) => items.map((item) => {
        return Object.values(qualities).find((quality) => quality._id === item.value)
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const isInvalid = validate(formData, validateRules)
        if (isInvalid) return
        const value = { 
            ...formData,
            profession: getProfessionById(),
            qualities: getQualities(formData.qualities)
        }
        api.users.update(user._id, value)
            .then(backToUserPage())
    }

    const handleChange = (target) => {
        setFormData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="has-validation shadow p-3">
            <TextField
                className="mt-2"
                label="Имя"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors?.name?.message || ''} />

            <TextField
                className="mt-2"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors?.email?.message || ''} />

            <RadioField
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                options={[
                    { value: 'male', label: 'Муж.' },
                    { value: 'female', label: 'Жен.' }
                ]} />

            <SelectField
                showLabel={false}
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                defaultOption="Выберите профессию"
                options={professions}
                error={errors?.profession?.message || ''} />

            <MultiSelect
                name="qualities"
                onChange={handleChange}
                options={qualities}
                showLabel={false}
                error={errors?.qualities?.message || ''}
                defaultValue={formData.qualities}
                placeholder="Ваши качества..." />

            <button
                type="submit"
                className="btn btn-primary w-100 mt-3">
                Изменить
            </button>
        </form>
    )
}

EditUserForm.propTypes = { 
    user: propTypes.object.isRequired,
    professions: propTypes.array.isRequired,
    qualities: propTypes.object.isRequired
}
 
export default EditUserForm
