import React from 'react'
import { Route } from 'react-router-dom'
import propTypes from 'prop-types'
// import { useAuth } from '../../hooks/useAuth'

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    // const { currentUser } = useAuth()
    return (
        <Route 
            {...rest}
            render={(props) => {
                // if (!currentUser) {
                //     return <Redirect 
                //         to={{ pathname: '/login', state: { from: props.location } }} />
                // }
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