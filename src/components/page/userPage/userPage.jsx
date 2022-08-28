import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../../api'
import Comments from '../../ui/comments'
import MeetingsCard from '../../common/meetingsCard'
import QualitiesCard from '../../common/quality/qualitiesCard'
import UserCard from '../../ui/userCard'

const UserPage = () => {

    const { userId } = useParams()
    const history = useHistory()
    const [user, setUser] = useState()

    useEffect(() => {
        api.users.fetchById(userId).then((data) => setUser(data))
    }, [])

    return (
        user ? (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <button
                            type="button" 
                            className="btn btn-primary w-100 mb-2" 
                            onClick={() => history.push('/users')}>
                            Все пользователи
                        </button>
                        <UserCard {...user} />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard completedMeetings={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        ) : (
            <h4>Loading</h4>
        )
    )
}
 
export default UserPage
