import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUserData } from '../../store/users'

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData())

    const [open, setOpen] = useState(false)

    const toggleMenu = () => setOpen((prevState) => !prevState)

    return (
        currentUser && (
            <div className="dropdown" onClick={toggleMenu}>
                <div className="btn dropdown-toggle d-flex align-items-centr">
                    <div className="mt-2">
                        {currentUser.name}
                    </div>
                    <img 
                        src="https://avatars.dicebear.com/api/avataaars/:seed.svg"
                        alt={currentUser.name}
                        height="40"
                        className="img-responsive rounded-circle" />
                </div>
                <div className={'w-100 dropdown-menu' + (open ? ' show' : '')}>
                    <Link
                        to={`/users/${currentUser._id}`}
                        className="dropdown-item">
                        Профиль
                    </Link>
                    <Link
                        to="/logout"
                        className="dropdown-item">
                        Выход
                    </Link>
                </div>
            </div>
        )
    )
}
 
export default NavProfile