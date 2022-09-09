import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/ui/navbar'
import Users from './components/layouts/users'
import Main from './components/layouts/main'
import Login from './components/layouts/login'
import 'react-toastify/dist/ReactToastify.css'
import { ProfessionProvider } from './hooks/useProfessions'
import { QualityProvider } from './hooks/useQualities'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './components/layouts/logOut'

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <Navbar />
            <QualityProvider>
                <ProfessionProvider>
                    <Switch>
                        <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/" exact component={Main} />
                        <Route to="/logaut" component={LogOut} />
                        <Redirect to="/" />
                    </Switch>
                </ProfessionProvider>
            </QualityProvider>
        </AuthProvider>
        <ToastContainer />
    </BrowserRouter>
)

export default App
