import React from 'react'
import propTypes from 'prop-types'

const Quality = ({ quality }) => {
    return (
        <span
            className={`badge bg-${quality.color} m-1`}>
            {quality.name}
        </span>
    )
}

Quality.propTypes = { quality: propTypes.object.isRequired }
 
export default Quality
