import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Login from './Login/Login'
import SignUp from './Login/SignUp'
import Home from './Pages/Home'
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
            <Route path='/users' component={ViewUsers}/>
          </Switch>
        </Router>
      </>
    )
  }

}

export default App
