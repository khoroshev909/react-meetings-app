import React from 'react'
import propTypes from 'prop-types'
import FormComponent from './form'
import SelectField from './selectField'
import TextAreaField from './textAreaField'

const AddCommentForm = ({ onAddComment, users }) => {

    const defaultData = {
        userId: '',
        content: ''
    }

    const validateRules = {
        userId: { isRequired: { message: 'Не выбран пользователь' } },
        content: { isRequired: { message: 'Введите комментарий' } }
    }

    return (
        <FormComponent
            defaultData={defaultData}
            validateRules={validateRules}
            onSubmit={(newComment) => onAddComment(newComment)}>

            <SelectField
                showLabel={false}
                name="userId"
                defaultOption="Выберите пользователя"
                options={users} />

            <TextAreaField
                autoFocus
                showLabel={false}
                placeholder="Добавьте комметарий..."
                name="content" />

            <button
                className="btn btn-primary w-100 mt-3"
                type="submit">
                Добавить комментарий
            </button>
            
        </FormComponent>
    )
}

AddCommentForm.propTypes = {
    users: propTypes.arrayOf(propTypes.object).isRequired,
    onAddComment: propTypes.func.isRequired
}
 
export default AddCommentForm