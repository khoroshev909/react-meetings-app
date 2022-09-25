import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import propTypes from 'prop-types'
import { getIsDataLoaded, loadUsers } from '../../../store/users'

const UsersLoader = ({ children }) => {

    const dispatch = useDispatch()
    const isUsersLoaded = useSelector(getIsDataLoaded())

    useEffect(() => {
        if (!isUsersLoaded) {
            dispatch(loadUsers())
        }
    }, [])

    if (!isUsersLoaded) return <h4>Loading...</h4>
    return children
}

UsersLoader.propTypes = {
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node
    ])
}
 
export default UsersLoader