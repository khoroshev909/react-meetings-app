import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import api from '../../../api'
import QualitiesList from '../../common/quality/qualitiesList'

const UserPage = () => {

    const { userId } = useParams()
    const history = useHistory()
    const [user, setUser] = useState(null)

    useEffect(() => {
        api.users.fetchById(userId).then((data) => setUser(data))
    }, [])

    const handleBackToUsers = () => {
        history.push('/users')
    }
    
    return (
        user ? (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        Имя: 
                        {user.name}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Профессия:
                        {user.profession.name}
                    </h6>
                    <p className="card-text">
                        Качества: 
                        <QualitiesList qualities={user.qualities} />
                    </p>
                    <p className="card-text">
                        Всего встреч: 
                        {user.completedMeetings}
                    </p>
                    <p className="card-text">
                        Оценка: 
                        {user.rate}
                    </p>
                    <p className="card-text">
                        <Link to={'/users/' + userId + '/edit'}>
                            Редактировать
                        </Link>
                    </p>
                    <button
                        type="button" 
                        className="btn btn-primary" 
                        onClick={handleBackToUsers}>
                        Все пользователи
                    </button>
                </div>
            </div>
        ) : (
            <h4>Loading</h4>
        )
    )
}
 
export default UserPage
