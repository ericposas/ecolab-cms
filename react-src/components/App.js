import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
// CMS - User management
import CreateUser from './CMS/Admin/CreateUser'
import CreateAdmin from './CMS/Admin/CreateAdmin'
import AdminLogin from './CMS/AdminLogin/AdminLogin'
import AdminLogout from './CMS/AdminLogin/AdminLogout'
import AdminHome from './CMS/Pages/AdminHome'
import ViewUsers from './CMS/Pages/ViewUsers'
import AdminPasswordReset from './CMS/Pages/AdminPasswordReset'
import PasswordReset from './CMS/Pages/PasswordReset'
// Application frontend
import AppAuth from './EndUserApplication/AppAuth'
import AppHome from './EndUserApplication/AppHome'
import CreateMode from './EndUserApplication/Pages/CreateMode'
import CreateWebModule from './EndUserApplication/Pages/CreateWebModule'
import ViewWebModules from './EndUserApplication/Pages/ViewWebModules'
import FileUpload from './EndUserApplication/Misc/FileUpload'
import CreateCompany from './EndUserApplication/Pages/CreateCompany'
import ViewCompanies from './EndUserApplication/Pages/ViewCompanies'
import CreateTour from './EndUserApplication/Pages/CreateTour'
import ViewTours from './EndUserApplication/Pages/ViewTours'
// import ViewTours from './EndUserApplication/Pages/ViewTours'
// Open / Closed - Extensibility Example
// import ExampleExtended from './OpenClosedPrinciple/ExampleExtended'

import axios from 'axios'

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path='/reset-user-password' component={AdminPasswordReset}/>
            <Route path='/reset-password/:formState?' component={PasswordReset}/>
            <Route path='/forgot-password' component={
              // () => {
              // return (
                class ForgotPath extends React.Component {
                  state = { forgotVal: '' }
                  handleForgotValue = e => {
                    this.setState({
                      forgotVal: e.target.value
                    })
                  }
                  render() {
                    return (
                      <>
                        <div>Email address:</div>
                        <input type='text' value={this.state.forgotVal} onChange={this.handleForgotValue}/>
                        <button onClick={() => {
                            axios.post('/password/forgot', { email: this.state.forgotVal })
                              .then(data => console.log(data))
                              .catch(err => console.log(err))
                        }}>Forgot password</button>
                      </>
                    )
                  }
                }
              // )
            }/>
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
            {/*<Route path='/create-company' component={CreateCompany}/>*/}
            <Route path='/create-company/:lastLocation?' component={CreateCompany}/>
            <Route path='/view-companies' component={ViewCompanies}/>
            <Route path='/create-tour' component={CreateTour}/>
            <Route path='/view-tours' component={ViewTours}/>
            {/*<Route path='/view-tours' component={ViewTours}/>*/}

            {/*
            <Route path='/open-closed' render={() => (
              <ExampleExtended someProp={'steak and whiskey'}></ExampleExtended>
            )}/>
            */}

          </Switch>
        </Router>
      </>
    )
  }

}

export default App
