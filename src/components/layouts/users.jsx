import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { getCurrentUserId } from '../../store/users'
import EditUserPage from '../page/editUserPage'
import UserPage from '../page/userPage'
import UsersListPage from '../page/usersListPage'
import UsersLoader from '../ui/hoc/usersLoader'

const Users = () => {
    
    const { userId, edit } = useParams()
    const currentUserId = useSelector(getCurrentUserId())
    
    return (
        <UsersLoader> 
            {userId ? (
                edit ? (userId === currentUserId
                    ? <EditUserPage />
                    : <Redirect to={`/users/${currentUserId}/edit`} />)
                    : (
                        <UserPage /> 
                    )
            ) : (
                <UsersListPage />
            )}        
        </UsersLoader>
    )
}
 
export default Users
