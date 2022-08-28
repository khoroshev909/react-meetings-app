import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../../api'
import EditUserForm from '../../common/form/editUserForm'

const EditUserPage = () => {
    const { userId } = useParams()
    const history = useHistory()
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

    const backToUserPage = () => {
        history.push(`/users/${user._id}`)
    }

    const getProfessionById = (data) => professions.find((p) => p._id === data.profession)

    const getQualities = (items) => items.map((item) => {
        return Object.values(qualities).find((quality) => quality._id === item.value)
    })

    const handleSubmmit = (data) => {
        const value = { 
            ...data,
            profession: getProfessionById(data),
            qualities: getQualities(data.qualities)
        }
        api.users.update(user._id, value)
        // .then(backToUserPage())
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4 className="mb-3">Редактирование пользователя</h4>
                    <button
                        type="button" 
                        className="btn btn-primary mb-2" 
                        onClick={backToUserPage}>
                        Назад к пользователю
                    </button>
                    {loading 
                        ? <h4>Loding</h4>
                        : <EditUserForm
                                onEditUser={handleSubmmit}
                                user={user}
                                qualities={qualities}
                                professions={professions} />}
                </div>
            </div>
        </div>
    )
}

EditUserPage.propTypes = {}
 
export default EditUserPage
