import React from 'react'
import propTypes from 'prop-types'

const SelectField = ({ 
    label,
    name, 
    value, 
    onChange, 
    defaultOption, 
    options, 
    error, 
    showLabel,
    hasValidation
}) => {

    const optionsArr = !Array.isArray(options) && typeof options === 'object'
        ? (
            Object.keys(options).map((key) => ({
                _id: options[key]._id,
                name: options[key].name
            }))
        ) 
        : options

    const handleChange = (e) => {
        onChange({ name, value: e.target.value })
    }

    const getClasses = () => {
        return hasValidation
            ? `form-select${error ? ' is-invalid' : ' is-valid'}`
            : 'form-select'
    }

    return (
        <div className="mt-2">
            {showLabel && (
                <label htmlFor={name + '-' + value} className="form-label">{label}</label>
            )}
            <select
                value={value}
                name={name}
                onChange={handleChange}
                className={getClasses()} 
                id={name + '-' + value}>
                <option
                    value="" 
                    disabled>
                    {defaultOption}
                </option>
                {optionsArr.length && (
                    optionsArr.map((option) => (
                        <option 
                            key={option._id}
                            value={option._id}>
                            {option.name}
                        </option>
                    ))
                )}
            </select>
            {!error || (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    )
}

SelectField.defaultProps = { 
    defaultOption: 'Выберите значение',
    label: 'Заполните поле',
    showLabel: false,
    hasValidation: true
}

SelectField.propTypes = {
    label: propTypes.string,
    name: propTypes.string.isRequired,
    value: propTypes.string,
    onChange: propTypes.func,
    defaultOption: propTypes.string,
    options: propTypes.oneOfType([propTypes.array, propTypes.object]),
    error: propTypes.string,
    hasValidation: propTypes.bool,
    showLabel: propTypes.bool
}
 
export default React.memo(SelectField) 