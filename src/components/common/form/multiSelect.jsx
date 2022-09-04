import React from 'react'
import propTypes from 'prop-types'
import Select from 'react-select'

const MultiSelect = ({ 
    name, 
    options, 
    onChange, 
    showLabel, 
    label, 
    error, 
    defaultValue, 
    placeholder 
}) => {
    const optionsArr = !Array.isArray(options) && typeof options === 'object'
        ? (
            Object.keys(options).map((key) => ({
                value: options[key]._id,
                label: options[key].name
            }))
        ) 
        : (
            options.map((option) => ({
                value: option._id,
                label: option.name
            }))
        )

    const handleChange = (data) => {
        const value = data.map((item) => item.value)
        onChange({ name, value })
    }

    return (
        <div className="mt-2">
            {showLabel && (
                <label>{label}</label>
            )}
            <Select
                isMulti
                closeMenuOnSelect={false}
                name={name}
                defaultValue={defaultValue}
                placeholder={placeholder}
                options={optionsArr}
                onChange={handleChange}
                className="basic-multi-select"
                classNamePrefix="select" />
            {!error || (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    )
}

MultiSelect.defaultProps = { 
    showLabel: true,
    label: 'Выберите значение',
    error: '',
    defaultValue: null,
    placeholder: 'Выберите...'
}

MultiSelect.propTypes = {
    name: propTypes.string.isRequired,
    options: propTypes.oneOfType([propTypes.array, propTypes.object]),
    onChange: propTypes.func,
    showLabel: propTypes.bool,
    label: propTypes.string,
    error: propTypes.string,
    defaultValue: propTypes.oneOfType([
        propTypes.object,
        propTypes.arrayOf(propTypes.object)
    ]),
    placeholder: propTypes.string
}
 
export default React.memo(MultiSelect)