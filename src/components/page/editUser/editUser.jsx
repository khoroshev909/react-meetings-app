import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../../api'
import EditUserForm from '../../ui/editUserForm'

const EditUser = () => {
    const [user, setUser] = useState(null)
    const history = useHistory()
    const { userId } = useParams()

    useEffect(() => {
        api.users.fetchById(userId).then((data) => setUser(data))
    }, []) 

    const handleBackToUserPage = () => {
        history.push(`/users/${userId}`)
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4 className="mb-3">Редактирование пользователя</h4>
                    <button
                        type="button" 
                        className="btn btn-primary mb-2" 
                        onClick={handleBackToUserPage}>
                        Назад к пользователю
                    </button>
                    {user 
                        ? (
                            <EditUserForm
                                user={user} />
                        ) 
                        : (
                            <h4>Loding</h4>
                        )}
                </div>
            </div>
        </div>
    )
}
 
export default EditUser
