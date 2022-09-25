import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import propTypes from 'prop-types'
import { getLogged, getUsersLoading, loadUsers } from '../../../store/users'
import { loadQualitiesList } from '../../../store/quality'
import { loadProfessions } from '../../../store/profession'

const AppLoader = ({ children }) => {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector(getLogged())
    const usersLoading = useSelector(getUsersLoading())
    // const profLoading = useSelector(getProfessionsLoading())
    // const qualitiesLoading = useSelector(getQualitiesLoading())

    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessions())
        if (isLoggedIn) {
            dispatch(loadUsers())
        }
    }, [])

    // if (!isUsersLoaded || profLoading || qualitiesLoading) return <h4>Loading...</h4>

    if (usersLoading) return <h4>Loading...</h4>

    return children
}

AppLoader.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node
    ])
}
 
export default AppLoader