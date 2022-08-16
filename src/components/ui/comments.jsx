import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import propTypes from 'prop-types'
import api from '../../api'
import CommentComponent from './commentComponent'
import validator from '../../utils/validator'
import SelectField from '../common/form/selectField'
import TextAreaField from '../common/form/textAreaField'

const Comments = ({ comments, onAddComment, onRemoveComment }) => {

    const [formData, setFormData] = useState({
        userId: '',
        content: ''
    })

    const [users, setUsers] = useState([])

    const [convertedComments, setConvertedComments] = useState([])

    const { userId: pageId } = useParams()

    const [errors, setErrors] = useState({})

    const validateRules = {
        userId: { isRequired: { message: 'Не выбран пользователь' } },
        content: { isRequired: { message: 'Введите комментарий' } }
    }

    const isValid = Object.keys(errors).length

    const validate = () => {
        const newErrors = validator(formData, validateRules)
        setErrors(newErrors)
        return Object.keys(errors).length
    } 
             
    useEffect(() => {
        api.users.fetchAll()
            .then((data) => setUsers(data))

        comments.forEach((comment) => {
            api.users.fetchById(comment.userId)
                .then((data) => {
                    const { name: userName } = data
                    const item = {
                        ...comment,
                        userName
                    }
                    setConvertedComments((prevstate) => [...prevstate, item])
                })
        })

    }, [])

    // Альтернативный метод, попробовать useRef
    // const transformedData = []
    // comments.forEach(async (comment) => {
    //     await api.users.fetchById(comment.userId)
    //         .then((data) => {
    //             const { name: userName } = data
    //             const item = {
    //                 ...comment,
    //                 userName
    //             }
    //             transformedData.push(item)
    //         })
    // })

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
        api.comments.add({
            ...formData,
            pageId
        }).then((data) => {
            onAddComment(data)
            e.target.reset()
        })
    }

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    {users.length ? (
                        <form onSubmit={handleSubmit}>
                            <SelectField
                                showLabel={false}
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                defaultOption="Выберите пользователя"
                                options={users}
                                error={errors?.userId?.message || ''} />

                            <TextAreaField
                                className="mt-2"
                                showLabel={false}
                                placeholder="Добавьте комметарий..."
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                error={errors?.content?.message || ''} />

                            <button
                                className="btn btn-primary w-100 mt-3"
                                type="submit"
                                disabled={isValid}>
                                Добавить комментарий
                            </button>
                        </form>
                    ) : (
                        <h4>Loading</h4>
                    )}
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>
                        Comments
                    </h2>
                    <hr />
                    {comments.length ? (
                        convertedComments.sort((prev, next) => { 
                            return +next.created_at - +prev.created_at
                        }).map((comment) => (
                            <CommentComponent
                                key={comment._id}
                                {...comment}
                                onRemoveComment={onRemoveComment} />
                        ))
                    ) : (
                        <h4>У вас пока нет комментариев</h4>
                    )}
                </div>
            </div>
        </>
    )
}

Comments.propTypes = { 
    comments: propTypes.arrayOf(propTypes.object).isRequired,
    onAddComment: propTypes.func.isRequired,
    onRemoveComment: propTypes.func.isRequired
}
  
export default Comments