import React from 'react'
import { useParams } from 'react-router-dom'
import EditUserPage from '../page/editUserPage'
import UserPage from '../page/userPage'
import UsersListPage from '../page/usersListPage'

const Users = () => {
    
    const { userId, edit } = useParams()

    return (
        userId ? (
            edit ? (
                <EditUserPage />
            ) : (
                <UserPage /> 
            )
        ) : (
            <UsersListPage />
        )
    )
}
 
export default Users
