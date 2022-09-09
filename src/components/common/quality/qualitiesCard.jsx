import React from 'react'
import propTypes from 'prop-types'
import QualitiesBadges from './qualitiesBadges'

const QualitiesCard = ({ qualitiesIds }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Качества</span>
                </h5>
                <p className="card-text">
                    <QualitiesBadges qualitiesIds={qualitiesIds} />
                </p>
            </div>
        </div>
    )
}

QualitiesCard.propTypes = { qualitiesIds: propTypes.array.isRequired }
 
export default QualitiesCard
