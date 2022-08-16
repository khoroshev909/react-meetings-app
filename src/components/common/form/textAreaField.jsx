import React from 'react'
import propTypes from 'prop-types'

const TextAreaField = ({
    label,
    rows,
    name,
    value,
    onChange, 
    error, 
    showLabel, 
    hasValidation,
    defaultValue,
    placeholder
}) => {

    const handleChange = (e) => {
        onChange({ name, value: e.target.value })
    }

    const getClasses = () => {
        return hasValidation 
            ? `form-control${error ? ' is-invalid' : ' is-valid'}`
            : 'form-control'
    }

    return (
        <div className="mt-3">
            {showLabel && (
                <label 
                    htmlFor={name + '-' + value}
                    className="form-label">
                    {label}
                </label>
            )}
            <textarea 
                className={getClasses()}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onChange={handleChange}
                id={name + '-' + value}
                rows={rows} />
            {!error || (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    )
}

TextAreaField.defaultProps = {
    rows: '3',
    showLabel: true,
    label: 'Выберите значение',
    hasValidation: true,
    defaultValue: '',
    placeholder: 'Введите значение'
}

TextAreaField.propTypes = {
    label: propTypes.string,
    rows: propTypes.string,
    value: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    error: propTypes.string.isRequired,
    showLabel: propTypes.bool,
    hasValidation: propTypes.bool,
    defaultValue: propTypes.string,
    placeholder: propTypes.string
}
 
export default TextAreaField