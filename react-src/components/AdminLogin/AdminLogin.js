import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'
import validator from 'email-validator'
import TitleBar from '../UIcomponents/TitleBar'

class AdminLogin extends Component {

  state = {
    emailValue: '',
    passwordValue: '',
    userMsg: false,
    showInvalidEmailError: false
  }

  componentDidMount() {
    const { checkAuth, setAdminData, history } = this.props
    checkAuth(data => {
      const { auth, owner, name, email } = data.data
      if (auth) { setAdminData(auth, owner, name, email); history.push('/users'); }
    })
  }

  componentWillUnmount() {
    if (this.userMsgTimer) clearTimeout(this.userMsgTimer)
    if (this.displayInvalidEmailErrorTimer) clearTimeout(this.displayInvalidEmailErrorTimer)
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
    const { history, setAdminData } = this.props
    e.preventDefault()
    axios.post('/logout')
      .then(data => {
        setAdminData(null, null, null)
        if (data.data == 'logged out') history.push('/')
      })
      .catch(err => console.log(err))
  }

  displayInvalidEmailError = () => {
    this.setState({
      ...this.state,
      showInvalidEmailError: true
    })
    this.displayInvalidEmailErrorTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        showInvalidEmailError: false
      })
    }, 2000)
  }

  logIn = e => {
    e.preventDefault()
    if (validator.validate(this.state.emailValue)) {
      axios.post('/login', {
        email: this.state.emailValue,
        password: this.state.passwordValue,
        admin: true
      })
      .then(data => {
        const { auth, owner, name, email, reset } = data.data
        if (auth) this.props.history.push('/users')
        else if (reset) this.props.history.push('/reset-password/adminCodeResetSuccess')
        else {
          this.setState({ ...this.state, userMsg: true })
          this.userMsgTimer = setTimeout(() => this.setState({ ...this.state, userMsg: false }), 2000)
        }
      })
      .catch(err => console.log(err))
    } else {
      this.displayInvalidEmailError()
    }
  }
  
  render() {
    const { AdminData } = this.props
    return (
      <>
        <TitleBar title={process.env.APP_NAME}/>
        {
          this.state.showInvalidEmailError
          ?
            <>
              <div>Invalid e-mail address</div>
            </>
          : null
        }
        {
          AdminData && AdminData.auth
          ?
            <>
              <div>You're already logged in as {AdminData.name}</div>
              <button style={{position:'absolute',top:0,right:0}} onClick={this.logout}>log out</button>
            </>
          :
            <>
              {
                this.state.userMsg
                ?
                  <div>
                    You need admin priviledges to access the admin panel.
                    Regular users should use the supplied /auth route for your application.
                  </div>
                : null
              }
              <div
                className='center-float'
                style={{
                  width: '400px',
                  height: '200px',
                  padding: '20px'
                }}>
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
              </div>
            </>
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(AdminLogin)))
