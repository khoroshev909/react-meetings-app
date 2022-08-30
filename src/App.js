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

const App = () => (
    <BrowserRouter>
        <Navbar />
        <QualityProvider>
            <ProfessionProvider>
                <Switch>
                    <Route path="/users/:userId?/:edit?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </ProfessionProvider>
        </QualityProvider>
        <ToastContainer />
    </BrowserRouter>
)

export default App
