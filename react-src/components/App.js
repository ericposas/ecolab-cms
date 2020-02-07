import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
// CMS - User management
import CreateUser from './Admin/CreateUser'
import CreateAdmin from './Admin/CreateAdmin'
import AdminLogin from './AdminLogin/AdminLogin'
import AdminLogout from './AdminLogin/AdminLogout'
import AdminHome from './Pages/AdminHome'
import ViewUsers from './Pages/ViewUsers'
import AdminPasswordReset from './Pages/AdminPasswordReset'
import PasswordReset from './Pages/PasswordReset'
// Application frontend
import AppAuth from './EndUserApplication/AppAuth'
import AppHome from './EndUserApplication/AppHome'
import CreateMode from './EndUserApplication/CreateMode'
import CreateWebModule from './EndUserApplication/CreateWebModule'
import ViewWebModules from './EndUserApplication/ViewWebModules'
import FileUpload from './EndUserApplication/FileUpload'
import CreateCompany from './EndUserApplication/CreateCompany'
import ViewCompanies from './EndUserApplication/ViewCompanies'
// Open / Closed - Extensibility Example
import ExampleExtended from './OpenClosedPrinciple/ExampleExtended'

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
            <Route path='/create-mode' component={CreateMode}/>
            <Route path='/create-web-module' component={CreateWebModule}/>
            <Route path='/view-web-modules' component={ViewWebModules}/>
            <Route path='/file-upload' component={FileUpload}/>
            <Route path='/create-company' component={CreateCompany}/>
            <Route path='/view-companies' component={ViewCompanies}/>

            <Route path='/open-closed' render={() => (
              <ExampleExtended someProp={'steak and whiskey'}></ExampleExtended>
            )}/>

          </Switch>
        </Router>
      </>
    )
  }

}

export default App
