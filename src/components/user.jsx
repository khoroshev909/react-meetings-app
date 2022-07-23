import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import api from '../api'

const User = () => {

    const history = useHistory()
    const [user, setUser] = useState(null)

    const { userId } = useParams()

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
                        Name: 
                        {user.name}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Профессия:
                        {user.profession.name}
                    </h6>
                    <p className="card-text">
                        Всего встреч: 
                        {user.completedMeetings}
                    </p>
                    <p className="card-text">
                        Оценка: 
                        {user.rate}
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
 
export default User
