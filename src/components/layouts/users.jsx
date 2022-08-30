import React from 'react'
import { useParams } from 'react-router-dom'
import { UserProvider } from '../../hooks/useUsers'
import EditUserPage from '../page/editUserPage'
import UserPage from '../page/userPage'
import UsersListPage from '../page/usersListPage'

const Users = () => {
    
    const { userId, edit } = useParams()

    return (
        <UserProvider>
            {userId ? (
                edit ? (
                    <EditUserPage />
                ) : (
                    <UserPage /> 
                )
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    )
}
 
export default Users
