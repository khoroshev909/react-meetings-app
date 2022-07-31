import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Navbar from './components/ui/navbar'
import Users from './components/layouts/users'
import Main from './components/layouts/main'
import Login from './components/layouts/login'
import UserPage from './components/page/userPage'

const App = () => (
    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route path="/users/:userId" component={UserPage} />
            <Route path="/users" component={Users} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
)

export default App
