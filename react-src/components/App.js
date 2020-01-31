import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import CreateUser from './Admin/CreateUser'
import Login from './Login/Login'
import Logout from './Login/Logout'
import Home from './Pages/Home'
import ViewUsers from './Pages/ViewUsers'
import AdminPasswordReset from './Pages/AdminPasswordReset'
import UserPasswordReset from './Pages/UserPasswordReset'
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
            <Route path='/reset-my-password' component={UserPasswordReset}/>
            <Route path='/create-user' component={CreateUser}/>
            <Route path='/admin' component={Login}/>
            <Route path='/admin-logout' component={Logout}/>
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
