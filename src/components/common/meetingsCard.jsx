import React from 'react'
import propTypes from 'prop-types'

const MeetingsCard = ({ completedMeetings }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Колличество встреч</span>
                </h5>
                <h1 className="display-1">{completedMeetings}</h1>
            </div>
        </div>
    )
}

MeetingsCard.propTypes = { completedMeetings: propTypes.number.isRequired }
 
export default MeetingsCard