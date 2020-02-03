import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import TitleBar from '../UIcomponents/TitleBar'
import axios from 'axios'

class AppAuth extends Component {

  state = {
    email: '',
    password: '',
    displayUserDataError: false,
    displayUserAuthenticatedMsg: false
  }

  componentWillUnmount() {
    if (this.userDataAuthTimer) clearTimeout(this.userDataAuthTimer)
    if (this.userDataErrorTimer) clearTimeout(this.userDataErrorTimer)
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
    axios.post('/users/appauth', { email: this.state.email, password: this.state.password })
      .then(data => {
        const { auth, name, email } = data.data
        console.log(data.data)
        if (auth && name && email) {
          setAppUserData(auth, name, email)
          this.showUserAuthenticatedMsg()
        } else if (data.data.reset) {
          history.push(`/reset-password/${'codeResetSuccess'}`)
        } else {
          this.showUserDataError()
        }
      })
      .catch(err => this.showUserDataError)
  }

  showUserDataError = () => {
    this.setState({
      ...this.state,
      displayUserDataError: true
    })
    this.userDataErrorTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        displayUserDataError: false
      })
    }, 2000)
  }

  showUserAuthenticatedMsg = () => {
    const { history } = this.props
    this.setState({
      ...this.state,
      displayUserAuthenticatedMsg: true
    })
    this.userDataAuthTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        displayUserAuthenticatedMsg: false
      })
      // redirect
      history.push('/')
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
          this.state.displayUserDataError
          ?
            <>
              <div className='padding-div-10'>Invalid credentials.</div>
            </>
          : null
        }
        {
          this.props.AppUserData.name && this.state.displayUserAuthenticatedMsg
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
