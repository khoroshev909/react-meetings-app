import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getLogged } from '../../store/users'

const Home = () => {
    const isLoggedIn = useSelector(getLogged())
    return isLoggedIn ? (
        <Redirect to="/users" />
    ) : (
        <Redirect to="/login" />
    )
}

export default Home