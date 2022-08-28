import React, { useState, useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import validator from '../../../utils/validator'

const FormComponent = ({ children, onSubmit, validateRules, defaultData, ...rest }) => {

    const [formData, setFormData] = useState(defaultData || {})

    const [errors, setErrors] = useState({})

    const isValid = Object.keys(errors).length

    const validate = () => {
        const newErrors = validator(formData, validateRules)
        setErrors(newErrors)
        return Object.keys(errors).length
    }

    // useEffect(() => {
    //     validate()
    // }, [])
    
    useEffect(() => {
        validate()
    }, [formData])

    const handleChange = useCallback((target) => {
        setFormData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }, [setFormData])

    const handleSubmit = (e) => {
        e.preventDefault()
        const isInvalid = validate(formData, validateRules)
        if (isInvalid) return
        e.target.reset()
        onSubmit(formData)
    }

    const clonedElemets = React.Children.map(children, (child) => {
        let config = {}
        if (typeof child.type === 'object') {
            if (!child.props.name) {
                throw new Error('Name is required for FormComponent field', child)
            }
            config = { 
                ...child.props,
                ...rest,
                onChange: handleChange,
                value: formData[child.props.name] || '',
                error: errors?.[child.props.name]?.message || ''
            }
        }
        
        if (typeof child.type === 'string') {
            if (child.type === 'button') {
                if (child.props.type === 'submit' || child.props.type === undefined) {
                    config = { ...child.props, disabled: isValid, ...rest }
                }
            }
        }
        const cloned = React.cloneElement(child, config)
        return cloned
    })
    
    return (
        <form
            className="has-validation shadow p-3"
            onSubmit={handleSubmit}>
            {clonedElemets}
        </form>
    )
}

FormComponent.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node)
    ], propTypes.node).isRequired,
    onSubmit: propTypes.func.isRequired,
    validateRules: propTypes.object.isRequired,
    defaultData: propTypes.object
}
 
export default FormComponent
