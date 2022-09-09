import React from 'react'
import propTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesBadges = ({ qualitiesIds }) => {
    const { getQualitiesForUser, loading } = useQualities()

    if (!loading) {
        const items = getQualitiesForUser(qualitiesIds)
        return (
            items.map((quality) => (
                <Quality key={quality._id} {...{ quality }} />
            ))
        )
    }
    return <p>Loading...</p>

}

QualitiesBadges.propTypes = { qualitiesIds: propTypes.array.isRequired }

export default QualitiesBadges
