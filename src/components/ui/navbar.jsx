import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentUserData } from '../../store/users'
import NavProfile from './navProfile'

const Navbar = () => {
    
    const currentUser = useSelector(getCurrentUserData())

    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/users" className="nav-link active">Meetings App</Link>
                    </li>
                </ul>
                <div className="d-flex">
                    {currentUser
                        ? <NavProfile />
                        : <Link to="/login" className="nav-link">Вход</Link>}
                </div> 
            </div>
        </nav> 
    )
}
 
export default Navbar
