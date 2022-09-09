import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { UserProvider } from '../../hooks/useUsers'
import EditUserPage from '../page/editUserPage'
import UserPage from '../page/userPage'
import UsersListPage from '../page/usersListPage'

const Users = () => {
    
    const { userId, edit } = useParams()
    const { currentUser } = useAuth()

    return (
        <UserProvider>
            {userId ? (
                edit ? (userId === currentUser._id
                    ? <EditUserPage />
                    : <Redirect to={`/users/${currentUser._id}/edit`} />)
                    : (
                        <UserPage /> 
                    )
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    )
}
 
export default Users
