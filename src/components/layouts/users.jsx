import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../userPage'
import UsersList from '../usersList'

const Users = () => {
    
    const { userId } = useParams()

    return (
        userId ? <UserPage /> : <UsersList />
    )
}
 
export default Users
