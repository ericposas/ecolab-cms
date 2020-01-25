import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'

class Login extends Component {

  state = {
    emailValue: '',
    passwordValue: '',
    userMsg: false
  }

  componentDidMount() {
    const { checkAuth, setUserData, history } = this.props
    checkAuth(data => {
      const { auth, admin, name, email } = data.data
      if (auth) setUserData(auth, admin, name, email)
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
    const { history, setUserData } = this.props
    e.preventDefault()
    axios.post('/logout')
      .then(data => {
        setUserData(null, null, null, null)
        if (data.data == 'logged out') history.push('/')
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
      const { auth, admin, name, email } = data.data
      if (auth && admin) this.props.history.push('/')
      else {
        this.setState({ ...this.state, userMsg: true })
        setTimeout(() => this.setState({ ...this.state, userMsg: false }), 2000)
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    const { UserData } = this.props
    return (
      <>
        {
          UserData.auth && UserData.admin
          ?
            <>
              <div>You're already logged in as {UserData.name}</div>
              <button style={{position:'absolute',top:0,right:0}} onClick={this.logout}>log out</button>
            </>
          :
            <>
              {
                this.state.userMsg
                ?
                  <div>
                    You need admin priviledges to access the admin panel.
                    Use the supplied /auth route for your application.
                  </div>
                : null
              }
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

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(Login)))
