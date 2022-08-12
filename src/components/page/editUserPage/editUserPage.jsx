import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../../api'
import EditUserForm from '../../ui/editUserForm'

const EditUserPage = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({ 
        _id: '',
        name: '',
        email: '',
        sex: '',
        profession: '',
        qualities: []
    })
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState([])
    const history = useHistory()
    const { userId } = useParams()

    const transformQualities = (items) => {
        return Array.isArray(items) 
            ? items.map((q) => ({ label: q.name, value: q._id }))
            : Object.keys(items).map((key) => ({ label: items[key].name, value: items[key]._id }))
    }

    useEffect(() => {
        api.users.fetchById(userId).then((data) => {
            setUser((prevstate) => ({
                ...prevstate,
                ...data,
                profession: data.profession._id,
                qualities: transformQualities(data.qualities)
            }))
        })
        api.professions.fetchAll().then((data) => setProfessions(data))
        api.qualities.fetchAll().then((data) => setQualities(data))
    }, [])

    useEffect(() => {
        if (user._id) setLoading(false)
    }, [user]) 

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
                    {loading
                        ? (
                            <h4>Loding</h4>
                        ) 
                        : (
                            <EditUserForm
                                user={user}
                                professions={professions}
                                qualities={qualities} />
                        )}
                </div>
            </div>
        </div>
    )
}
 
export default EditUserPage
