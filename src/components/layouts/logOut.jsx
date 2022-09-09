import React, { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'

const LogOut = () => {
    const { logOut } = useAuth()

    useEffect(() => {
        logOut()
    }, [])

    return <h4>Loading...</h4>
}
 
export default LogOut