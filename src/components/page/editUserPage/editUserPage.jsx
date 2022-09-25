import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import EditUserForm from '../../common/form/editUserForm'
import { getQualities, getQualitiesLoading } from '../../../store/quality'
import { getProfessions, getProfessionsLoading } from '../../../store/profession'
import { getCurrentUserData, getUsersLoading, updateUser } from '../../../store/users'

const EditUserPage = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const history = useHistory()
    
    const userLoading = getUsersLoading()
    const professions = useSelector(getProfessions())
    const professionsLoading = useSelector(getProfessionsLoading())
    const qualities = useSelector(getQualities())
    const qualitiesLoading = useSelector(getQualitiesLoading())

    const transformQualities = (items) => {
        return Array.isArray(items) 
            ? qualities.filter((quality) => items.includes(quality._id))
                .map((q) => ({ label: q.name, value: q._id }))
            : Object.keys(items).map((key) => ({ label: items[key].name, value: items[key]._id }))
    }

    const currentUserData = useSelector(getCurrentUserData())

    const user = {
        ...currentUserData,
        qualities: transformQualities(currentUserData.qualities)
    }

    const transformQualitiestoIds = (items) => {
        return items.map((item) => typeof item === 'string' ? item : item.value)
    }
    
    const backToUserPage = () => {
        history.push(`/users/${user._id}`)
    }

    const handleSubmmit = (data) => {
        dispatch(updateUser({ 
            ...data,
            qualities: transformQualitiestoIds(data.qualities),
            _id: userId
        }))
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
                    {userLoading && professionsLoading && qualitiesLoading
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
