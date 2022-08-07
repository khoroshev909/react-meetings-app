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
    placeHolder
}) => {
    const [showPassport, setShowPassport] = useState(false)

    const handleChange = (e) => {
        onChange({ name, value: e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassport((prevState) => !prevState)
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
                    className={getClasses()}
                    type={showPassport ? 'text' : type}
                    placeholder={placeHolder}
                    id={name + '-' + value}
                    name={name}
                    value={value}
                    onChange={handleChange} />
                {type === 'password' && (
                <button
                    onClick={handleShowPassword}
                    type="button" 
                    className="btn btn-outline-secondary">
                    <i className={`bi bi-eye-${showPassport ? 'slash' : 'fill'}`} />
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
    value: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    error: propTypes.string.isRequired,
    showLabel: propTypes.bool,
    hasValidation: propTypes.bool,
    placeHolder: propTypes.string
}
 
export default TextField
