import React from 'react'

const QualitiesList = (qualities) => {
    return Object.values(qualities).map((quality) => {
        return (
            <span
                key={quality._id}
                className={`badge bg-${quality.color} m-1`}>
                {quality.name}
            </span>
        )
    })
}

export default QualitiesList
