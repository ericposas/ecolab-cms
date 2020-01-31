import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import CreateUser from './Admin/CreateUser'
import CreateAdmin from './Admin/CreateAdmin'
import AdminLogin from './AdminLogin/AdminLogin'
import AdminLogout from './AdminLogin/AdminLogout'
import AdminHome from './Pages/AdminHome'
import ViewUsers from './Pages/ViewUsers'
import AdminPasswordReset from './Pages/AdminPasswordReset'
import PasswordReset from './Pages/PasswordReset'
import AppAuth from './EndUserApplication/AppAuth'
import AppHome from './EndUserApplication/AppHome'
import axios from 'axios'

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path='/reset-user-password' component={AdminPasswordReset}/>
            <Route path='/reset-password/:formState' component={PasswordReset}/>
            <Route path='/create-admin' component={CreateAdmin}/>
            <Route path='/create-user' component={CreateUser}/>
            <Route path='/admin' component={AdminLogin}/>
            <Route path='/logout/:type' component={AdminLogout}/>
            <Route path='/users' component={ViewUsers}/>

            <Route exact path='/' component={AppHome}/>
            <Route path='/login' component={AppAuth}/>

          </Switch>
        </Router>
      </>
    )
  }

}

export default App
