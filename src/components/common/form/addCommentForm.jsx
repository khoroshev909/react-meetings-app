import React from 'react'
import propTypes from 'prop-types'
import FormComponent from './form'
import TextAreaField from './textAreaField'

const AddCommentForm = ({ onAddComment }) => {

    const defaultData = { content: '' }

    const validateRules = { userId: { isRequired: { message: 'Не выбран пользователь' } } }

    return (
        <FormComponent
            defaultData={defaultData}
            validateRules={validateRules}
            onSubmit={(newComment) => onAddComment(newComment)}>

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

AddCommentForm.propTypes = { onAddComment: propTypes.func.isRequired }
 
export default AddCommentForm