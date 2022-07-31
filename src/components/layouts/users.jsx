import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../page/userPage'
import UsersListPage from '../page/usersListPage'

const Users = () => {
    
    const { userId } = useParams()

    return (
        userId ? <UserPage /> : <UsersListPage />
    )
}
 
export default Users
