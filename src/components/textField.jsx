import React, { useState } from 'react'
import propTypes from 'prop-types'

const TextField = ({ labelText, type, name, value, onChange, error }) => {
    const [showPassport, setShowPassport] = useState(false)

    const handleShowPassport = () => {
        setShowPassport((prevState) => !prevState)
    }

    return (
        <div className="mt-2">
            <label htmlFor="email">{labelText}</label>
            <div className="input-group">
                <input 
                    className={`form-control${error ? ' is-invalid' : ' is-valid'}`}
                    type={showPassport ? 'text' : type} 
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange} />
                {type === 'password' && (
                <button
                    onClick={handleShowPassport}
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

TextField.defaultProps = { type: 'text' }

TextField.propTypes = {
    labelText: propTypes.string.isRequired,
    type: propTypes.string,
    value: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    error: propTypes.string.isRequired
}
 
export default TextField
