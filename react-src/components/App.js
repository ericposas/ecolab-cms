import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Login from './Login/Login'
import AuthCheck from './Login/AuthCheck'
import SignUp from './Login/SignUp'
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nameValue: '',
      emailValue: '',
      passwordValue: '',
      signUpClicked: false
    }
  }

  componentDidMount() {

  }

  // test() {
  //   console.log('test')
  // }

  test = () => {
    console.log('test')
  }

  signUpClick = () => {
    this.setState({
      ...this.state,
      signUpClicked: true
    })
  }

  onNameInput = e => {
    this.setState({
      ...this.state,
      nameValue: e.target.value
    })
  }

  onEmailInput = e => {
    this.setState({
      ...this.state,
      emailValue: e.target.value
    })
  }

  onPasswordInput = e => {
    this.setState({
      ...this.state,
      passwordValue: e.target.value
    })
  }

  submitForm = e => {
    e.preventDefault()
    axios.post('/signup', {
        name: this.state.nameValue,
        email: this.state.emailValue,
        password: this.state.passwordValue
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path='/' render={() => {
                return (
                  <>
                    <div>Home</div>
                  </>
                )
              }}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={Login}/>
            <Route path='/authCheck' component={AuthCheck}/>
          </Switch>
        </Router>
      </>
    )
  }

}

export default App
