import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import propTypes from 'prop-types'
import { getProfessionById } from '../../store/profession'
import { getCurrentUserData } from '../../store/users'

const UserCard = ({ 
    _id,
    name,
    profession: professionId,
    rate
}) => {

    const history = useHistory()
    const currentUser = useSelector(getCurrentUserData())
    const handleClick = () => history.push(history.location.pathname + '/edit')

    const profession = useSelector(getProfessionById(professionId)) 

    return (
        <div className="card mb-3">
            <div className="card-body">
                {_id === currentUser._id && (
                    <button 
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleClick}
                        type="button">
                        <i className="bi bi-gear" />
                    </button>
                )}
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        alt="fvsvfb"
                        src="https://avatars.dicebear.com/api/avataaars/:seed.svg"
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <p className="text-secondary mb-1">{profession.name}</p>
                        <div className="text-muted">
                            <i className="bi bi-caret-down-fill text-primary" />
                            <i className="bi bi-caret-up text-secondary" />
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

UserCard.propTypes = {
    _id: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    profession: propTypes.string.isRequired,
    rate: propTypes.number.isRequired
}
 
export default UserCard
