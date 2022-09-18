import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../hooks/useAuth'
import NavProfile from './navProfile'
import { loadQualitiesList } from '../../store/quality'
import { loadProfessions } from '../../store/profession'

const Navbar = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessions())
    }, [])
    
    const { currentUser } = useAuth()
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active">Main</Link>
                    </li>
                    {currentUser && (
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">Users</Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {currentUser
                        ? <NavProfile />
                        : <Link to="/login" className="nav-link">Login</Link>}
                </div> 
            </div>
        </nav> 
    )
}
 
export default Navbar
