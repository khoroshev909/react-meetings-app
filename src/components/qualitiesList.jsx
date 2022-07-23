import React from 'react'
import propTypes from 'prop-types'
import Quality from './quality'

const QualitiesList = ({ qualities }) => (
    qualities.map((quality) => (
        <Quality key={quality._id} {...{ quality }} />
    ))
)

QualitiesList.propTypes = { qualities: propTypes.array.isRequired }

export default QualitiesList
