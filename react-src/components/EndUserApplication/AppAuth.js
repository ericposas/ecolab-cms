import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'
import validator from 'email-validator'
import TitleBar from '../CMS/UIcomponents/TitleBar'

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

  displayUserDataError = () => {
    this.setState({
      ...this.state,
      showUserDataError: true
    })
    this.userDataErrorTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        showUserDataError: false
      })
    }, 2000)
  }

  displayUserAuthenticatedMsg = () => {
    const { history } = this.props
    this.setState({
      ...this.state,
      showUserAuthenticatedMsg: true
    })
    this.userDataAuthTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        showUserAuthenticatedMsg: false
      })
      // redirect
      history.push('/')
    }, 2000)
  }

  displayInvalidEmailError = () => {
    this.setState({
      ...this.state,
      showInvalidEmailError: true
    })
    this.invalidEmailErrorTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        showInvalidEmailError: false
      })
    }, 2000)
  }

  render() {
    return (
      <>
        <TitleBar title={'Login'} color={'#00ffae'}/>
        <br/>
        <div className='padding-div-10'>
          <form>
            <div>Email address:</div>
            <input type='text' onChange={this.onEmailInput} value={this.state.email}/>
            <div>Password:</div>
            <input type='password' onChange={this.onPasswordInput} value={this.state.password}/>
          </form>
          <br/>
          <button onClick={this.onFormSubmit}>submit</button>
        </div>
        {
          this.state.showInvalidEmailError
          ? <>
              <div className='padding-div-10'>Invalid Email.</div>
            </>
          : null
        }
        {
          this.state.showUserDataError
          ?
            <>
              <div className='padding-div-10'>Invalid credentials.</div>
            </>
          : null
        }
        {
          this.props.AppUserData.name && this.state.showUserAuthenticatedMsg
          ?
            <>
              <div className='padding-div-10'>{this.props.AppUserData.name}, you are now authenticated.</div>
            </>
          : null
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(AppAuth))
