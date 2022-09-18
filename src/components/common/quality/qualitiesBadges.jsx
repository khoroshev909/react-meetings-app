import React from 'react'
import { useSelector } from 'react-redux'
import propTypes from 'prop-types'
import Quality from './quality'
import { getQualitiesList, getQualitiesLoading } from '../../../store/quality'

const QualitiesBadges = ({ qualitiesIds }) => {

    const loading = useSelector(getQualitiesLoading())

    if (loading) return <p>Loading...</p> 

    const qualitiesList = useSelector(getQualitiesList(qualitiesIds))
    if (!loading) {
        return (
            qualitiesList.map((quality) => (
                <Quality key={quality._id} {...{ quality }} />
            ))
        )
    }
}

QualitiesBadges.propTypes = { qualitiesIds: propTypes.array.isRequired }

export default QualitiesBadges
