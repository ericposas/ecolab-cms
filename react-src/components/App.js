import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import CreateUser from './Admin/CreateUser'
import Login from './Login/Login'
import Home from './Pages/Home'
import ViewUsers from './Pages/ViewUsers'
import AdminPasswordReset from './Pages/AdminPasswordReset'
import UserPasswordReset from './Pages/UserPasswordReset'
import axios from 'axios'

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/user/password/reset' component={UserPasswordReset}/>
            <Route path='/admin/password/reset' component={AdminPasswordReset}/>
            <Route path='/users/create' component={CreateUser}/>
            <Route path='/login' component={Login}/>
            <Route path='/users' component={ViewUsers}/>
          </Switch>
        </Router>
      </>
    )
  }

}

export default App
