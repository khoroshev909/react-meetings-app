import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/ui/navbar'
import Users from './components/layouts/users'
import Main from './components/layouts/main'
import Login from './components/layouts/login'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './components/layouts/logOut'
import createStore from './store/createStore'

const store = createStore()

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Switch>
                    <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/" exact component={Main} />
                    <Route to="/logaut" component={LogOut} />
                    <Redirect to="/" />
                </Switch>
            </AuthProvider>
            <ToastContainer />           
        </BrowserRouter>
    </Provider>
)

export default App
