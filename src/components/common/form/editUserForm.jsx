import React from 'react'
import propTypes from 'prop-types'
import FormComponent from './form'
import TextField from './textField'
import SelectField from './selectField'
import MultiSelect from './multiSelect'

const EditUserForm = ({ user, qualities, professions, onEditUser }) => {
    
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

    return (
        <FormComponent
            validateRules={validateRules}
            defaultData={user || {}}
            onSubmit={(data) => onEditUser(data)}>

            <TextField
                label="Имя"
                name="name"
                autoFocus />

            <TextField
                label="Email"
                name="email" />

            <SelectField
                showLabel={false}
                options={professions}
                name="profession"
                defaultOption="Выберите профессию" />

            <MultiSelect
                name="qualities"
                defaultValue={user.qualities || []}
                options={qualities}
                showLabel={false}
                placeholder="Ваши качества..." />

            <button
                type="submit"
                className="btn btn-primary w-100 mt-3">
                Обновить
            </button>
        </FormComponent>
    )
}

EditUserForm.propTypes = {
    user: propTypes.object.isRequired,
    qualities: propTypes.array.isRequired,
    professions: propTypes.array.isRequired,
    onEditUser: propTypes.func.isRequired
}
 
export default EditUserForm