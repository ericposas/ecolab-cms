import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Login from './Login/Login'
import AuthCheck from './Login/AuthCheck'
import SignUp from './Login/SignUp'
import Home from './Login/Home'
import ViewUsers from './Pages/ViewUsers'
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={Login}/>
            <Route path='/authCheck' component={AuthCheck}/>
            <Route path='/viewUsers' component={ViewUsers}/>
          </Switch>
        </Router>
      </>
    )
  }

}

export default App
