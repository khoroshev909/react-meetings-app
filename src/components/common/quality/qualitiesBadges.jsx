import React from 'react'
import propTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesBadges = ({ ids }) => {
    const { getQualitiesForUser, loading } = useQualities()

    if (!loading) {
        const qualities = getQualitiesForUser(ids)
        return (
            qualities.map((quality) => (
                <Quality key={quality._id} {...{ quality }} />
            ))
        )
    }
    return <p>Loading...</p>

}

QualitiesBadges.propTypes = { ids: propTypes.array.isRequired }

export default QualitiesBadges
