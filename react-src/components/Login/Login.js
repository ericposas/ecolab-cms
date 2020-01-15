import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import axios from 'axios'

class Login extends Component {
  
  state = {
    emailValue: '',
    passwordValue: '',
    loggedIn: false
  }

  componentDidMount() {
    this.props.checkAuth(data => {
      if (data.data.auth == true) {
        this.setState({
          ...this.state,
          loggedIn: true
        })
      }
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

  logout = e => {
    e.preventDefault()
    axios.post('/logout')
      .then(data => {
        if (data.data == 'logged out') {
          this.props.history.push('/')
        }
      })
      .catch(err => console.log(err))
  }

  logIn = e => {
    e.preventDefault()
    axios.post('/login', {
      email: this.state.emailValue,
      password: this.state.passwordValue
    })
    .then(data => {
      if (data.data == 'authorized') this.props.history.push('/authCheck')
      else console.log(data.data)
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        {
          this.state.loggedIn
          ?
            <>
              <div>You're already logged in</div>
              <button style={{position:'absolute',top:0,right:0}} onClick={this.logout}>log out</button>
            </>
          :
            <>
              <div>log in</div>
              <div>
                <form method='post'>
                  <label>email: &nbsp;</label>
                  <input onChange={this.onEmailInput} type='text' value={this.state.emailValue}/><br/>
                  <label>password: &nbsp;</label>
                  <input onChange={this.onPasswordInput} type='password' value={this.state.passwordValue}/><br/>
                  <input onClick={this.logIn} type='submit' value='log in'/>
                </form>
              </div>
            </>
        }
      </>
    )
  }

}

export default withAuthCheck(withRouter(Login))
