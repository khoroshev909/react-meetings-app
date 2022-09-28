import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import propTypes from 'prop-types'
import { getLogged } from '../../store/users'

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const isLoggedIn = useSelector(getLogged())
    return (
        <Route 
            {...rest}
            render={(props) => {
                if (!isLoggedIn && props.location.pathname !== '/login') {
                    return <Redirect 
                        to={{ pathname: '/login', state: { from: props.location } }} />
                }
                if (isLoggedIn && props.location.pathname === '/login') {
                    return <Redirect 
                        to={{ pathname: '/users', state: { from: props.location } }} />
                }
                return Component ? <Component {...props} /> : children 
            }} />
    )
}

ProtectedRoute.defaultProps = { component: null }

ProtectedRoute.propTypes = {
    component: propTypes.func,
    children: propTypes.oneOfType([
        propTypes.arrayOf(propTypes.node),
        propTypes.node
    ]),
    location: propTypes.object
}
 
export default ProtectedRoute