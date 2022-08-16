import React from 'react'
import propTypes from 'prop-types'
import Quality from './quality'

const QualitiesBadges = ({ qualities }) => (
    qualities.map((quality) => (
        <Quality key={quality._id} {...{ quality }} />
    ))
)

QualitiesBadges.propTypes = { qualities: propTypes.array.isRequired }

export default QualitiesBadges
