import React, { useState } from 'react'
import propTypes from 'prop-types'

const TextField = ({ 
    labelText,
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

    const handleShowPassword = () => {
        setShowPassport((prevState) => !prevState)
    }

    return (
        <div className="mt-2">
            {showLabel && (
                <label htmlFor="email">{labelText}</label>
            )}
            <div className="input-group">
                <input 
                    className={hasValidation 
                        ? `form-control${error ? ' is-invalid' : ' is-valid'}`
                        : 'form-control'}
                    type={showPassport ? 'text' : type}
                    placeholder={placeHolder}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange} />
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
    hasValidation: true,
    placeHolder: ''
}

TextField.propTypes = {
    labelText: propTypes.string.isRequired,
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
