import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import { toast, ToastContainer } from 'react-toastify'
import TitleBar from '../UIcomponents/TitleBar'
import { TextField, Button } from '@material-ui/core'
import validator from 'email-validator'
import axios from 'axios'

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
  }

  componentDidUpdate(prevProps, prevState) {
    // this.state.emailValue != prevProps.emailValue
    // ? console.log('should be typing')
    // : console.log('...')
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
    toast.error('Invalid email address..', { autoClose: 2000 })
  }

  displayAdminUserError = () => {
    toast.error('You need admin priviledges to access the admin panel.', { autoClose: 2000 })
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
        if (auth) {
          toast.success('Authenticated as Admin', { autoClose: 750, onClose: () => this.props.history.push('/users') })
        } else if (reset) this.props.history.push('/reset-password/adminCodeResetSuccess')
        else this.displayAdminUserError()
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
        <ToastContainer/>
        <TitleBar title={`${process.env.APP_NAME} Administrator Panel`}/>
        {
          AdminData && AdminData.auth
          ?
            <>
              <div>You're already logged in as {AdminData.name}</div>
              <button style={{position:'absolute',top:0,right:0}} onClick={this.logout}>log out</button>
            </>
          :
            <>
              <div
                className='center-float'
                style={{ width: '400px', height: '240px', padding: '20px', border: 'none', borderRadius: '4px' }}>
                <div>Administrator log in</div>
                <br/>
                <div>
                  <TextField label='email' onChange={this.onEmailInput} type='text' value={this.state.emailValue}/><br/>
                  <TextField label='password' onChange={this.onPasswordInput} type='password' value={this.state.passwordValue}/><br/>
                  <br/>
                  <Button
                    onClick={this.logIn}
                    variant='contained'
                    color='default'>
                    Log in
                  </Button>
                </div>
              </div>
            </>
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(AdminLogin)))
