import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import axios from 'axios'
import validator from 'email-validator'
import TitleBar from '../../CMS/UIcomponents/TitleBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// import { makeStyles, withStyles } from '@material-ui/core/styles'
import { ToastContainer, toast } from 'react-toastify'

class AppAuth extends Component {

  state = {
    email: '',
    password: '',
    showUserDataError: false,
    showUserAuthenticatedMsg: false,
    showInvalidEmailError: false
  }

  componentWillUnmount() {
    if (this.userDataAuthTimer) clearTimeout(this.userDataAuthTimer)
    if (this.userDataErrorTimer) clearTimeout(this.userDataErrorTimer)
    if (this.invalidEmailErrorTimer) clearTimeout(this.invalidEmailErrorTimer)
  }

  onEmailInput = e => {
    this.setState({
      ...this.state,
      email: e.target.value
    })
  }

  onPasswordInput = e => {
    this.setState({
      ...this.state,
      password: e.target.value
    })
  }

  onFormSubmit = e => {
    const { setAppUserData, history } = this.props
    e.preventDefault()
    if (validator.validate(this.state.email)) {
      axios.post('/users/appauth', { email: this.state.email, password: this.state.password })
        .then(data => {
          const { auth, fullaccess, peer, name, email } = data.data
          console.log(data.data)
          if (auth && name && email) {
            setAppUserData(auth, fullaccess, peer, name, email)
            this.displayUserAuthenticatedMsg()
          } else if (data.data.reset) {
            history.push(`/reset-password/${'codeResetSuccess'}`)
          } else {
            this.displayUserDataError()
          }
        })
        .catch(err => this.showUserDataError)
    } else {
      this.displayInvalidEmailError()
    }
  }

  displayUserDataError = () => toast.error('Invalid password', { autoClose: 2000 })

  displayInvalidEmailError = () => toast.error('Invalid e-mail', { autoClose: 2000 })

  displayUserAuthenticatedMsg = () => {
    const { history } = this.props
    toast.success('You are now authenticated!', {
      autoClose: 2000,
      onClose: () => history.push('/')
    })
  }
  
  render() {
    return (
      <>
        <ToastContainer/>
        <TitleBar title={'Eco Lab CMS Login'}/>
        <br/>
        <div className='padding-div-10'>
          <div className='center-float' style={{ backgroundColor: '#e5e5e5', width: '300px', height: '280px', borderRadius: '3px', textAlign: 'center', border: 'none' }}>
            <br/>
            <div className='padding-div-10'>
              <div><b>Login</b></div>
              <br/>
              <TextField
                label='email address'
                variant='outlined'
                onChange={this.onEmailInput}
                value={this.state.email}/>
            </div>
              <br/>
            <div>
              <TextField
                label='password'
                variant='outlined'
                type='password'
                onChange={this.onPasswordInput}
                value={this.state.password}/>
              <br/>
              <br/>
            </div>
            <Button variant='contained' color='primary' onClick={this.onFormSubmit}>Submit</Button>
          </div>
        </div>
        {
          this.state.showUserDataError
          ?
            <>
              <div className='padding-div-10'>Invalid credentials.</div>
            </>
          : null
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(AppAuth))
