import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import Comments from '../../ui/comments'
import MeetingsCard from '../../common/meetingsCard'
import QualitiesCard from '../../common/quality/qualitiesCard'
import UserCard from '../../ui/userCard'
import { CommentProvider } from '../../../hooks/useComments'
import { getUserById } from '../../../store/users'

const UserPage = () => {

    const history = useHistory()

    const { userId } = useParams()
    const user = useSelector(getUserById(userId))
    
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
                        <QualitiesCard qualitiesIds={user.qualities} />
                        <MeetingsCard completedMeetings={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CommentProvider>
                            <Comments />
                        </CommentProvider>
                    </div>
                </div>
            </div>
        ) : (
            <h4>Loading</h4>
        )
    )
}
 
export default UserPage
