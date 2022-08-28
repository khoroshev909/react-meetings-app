import React, { useState } from 'react'
import propTypes from 'prop-types'

const TextField = ({ 
    label,
    type,
    name,
    value,
    onChange, 
    error, 
    showLabel, 
    hasValidation,
    placeHolder,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        onChange({ name, value: e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState)
    }

    const getClasses = () => {
        return hasValidation 
            ? `form-control${error ? ' is-invalid' : ' is-valid'}`
            : 'form-control'
    }

    return (
        <div className="mt-2">
            {showLabel && (
                <label htmlFor={name + '-' + value}>{label}</label>
            )}
            <div className="input-group">
                <input 
                    className={getClasses() + 'mt-2'}
                    type={showPassword ? 'text' : type}
                    placeholder={placeHolder}
                    id={name + '-' + value}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    {...rest} />
                {type === 'password' && (
                <button
                    onClick={handleShowPassword}
                    type="button" 
                    className="btn btn-outline-secondary">
                    <i className={`bi bi-eye-${showPassword ? 'slash' : 'fill'}`} />
                </button>)}
                {!error || (
                    <div className="invalid-feedback d-block">{error}</div>
                )}
            </div>
        </div>
    )
}

TextField.defaultProps = { 
    type: 'text',
    showLabel: true,
    label: 'Выберите значение',
    hasValidation: true,
    placeHolder: ''
}

TextField.propTypes = {
    label: propTypes.string,
    type: propTypes.string,
    value: propTypes.string,
    name: propTypes.string.isRequired,
    onChange: propTypes.func,
    error: propTypes.string,
    showLabel: propTypes.bool,
    hasValidation: propTypes.bool,
    placeHolder: propTypes.string
}
 
export default React.memo(TextField) 
