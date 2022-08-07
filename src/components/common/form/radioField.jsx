import React from 'react'
import propTypes from 'prop-types'

const RadioField = ({
    name,
    value,
    onChange,
    options
}) => {

    const handleChange = (e) => {
        onChange({ name, value: e.target.value })
    }

    return (
        <div className="mt-2">
            {options.map((option) => (
                <div className="form-check" key={option.value}>
                    <label className="form-check-label" htmlFor={name + '-' + option.value}>{option.label}</label>
                    <input
                        checked={option.value === value}
                        className="form-check-input" 
                        type="radio"
                        value={option.value}
                        onChange={handleChange}
                        name={name} 
                        id={name + '-' + option.value} />
                </div>
            ))}
        </div>
    )
}

RadioField.propTypes = {
    name: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    options: propTypes.array.isRequired
}
 
export default RadioField