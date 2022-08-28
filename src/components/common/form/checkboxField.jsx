import React from 'react'
import propTypes from 'prop-types'

const CheckboxField = ({ name, value, onChange, children, error, hasValidation }) => {

    const handleChange = (e) => {
        const newValue = e.target.value === 'false' ? true : false
        onChange({ name, value: newValue })
    }

    const getClasses = () => {
        return hasValidation 
            ? `form-check-input${error ? ' is-invalid' : ' is-valid'}`
            : 'form-check-input'
    }

    return (
        <div className="mt-2">
            <div className="form-check">
                <input 
                    className={getClasses()} 
                    type="checkbox" 
                    value={value} 
                    id={name}
                    name={name}
                    onChange={handleChange}
                    checked={value} />
                <label className="form-check-label" htmlFor={name}>
                    {children}
                </label>
            </div>
        </div>
    )
}

CheckboxField.defaultProps = { 
    hasValidation: true,
    error: ''
}

CheckboxField.propTypes = {
    name: propTypes.string.isRequired,
    value: propTypes.bool,
    onChange: propTypes.func,
    error: propTypes.string,
    children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node]),
    hasValidation: propTypes.bool
}
 
export default React.memo(CheckboxField)
