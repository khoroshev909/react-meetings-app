import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
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

    const handleGoToEditUser = () => {
        history.push(history.location.pathname + '/edit')
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
                    <div>
                        <button
                            type="button" 
                            className="btn btn-primary m-2" 
                            onClick={handleGoToEditUser}>
                            Редактировать
                        </button>
                        <button
                            type="button" 
                            className="btn btn-primary" 
                            onClick={handleBackToUsers}>
                            Все пользователи
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            <h4>Loading</h4>
        )
    )
}
 
export default UserPage
