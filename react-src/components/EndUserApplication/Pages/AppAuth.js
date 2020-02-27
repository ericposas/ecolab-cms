import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import axios from 'axios'
import validator from 'email-validator'
import TitleBar from '../UIcomponents/TitleBar'
import { Button, TextField, Label } from '@material-ui/core/'
import TextFieldWithEcoStyles from '../UIcomponents/TextFieldWithEcoStyles'
import ButtonWithEcoStyles from '../UIcomponents/ButtonWithEcoStyles'
import { ToastContainer, toast } from 'react-toastify'
import EcoLabColors from '../Colors/EcoLabColors'

class AppAuth extends Component {

  state = {
    email: '',
    password: '',
    showUserDataError: false,
    showUserAuthenticatedMsg: false,
    showInvalidEmailError: false
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
          console.log(data)
          if (auth && name && email) {
            setAppUserData(auth, fullaccess, peer, name, email)
            this.displayUserAuthenticatedMsg()
          } else if (data.data.reset) {
            history.push(`/reset-password/${'codeResetSuccess'}`)
          } else {
            this.displayUserDataError()
          }
        })
        .catch(err => { this.displayUserDataError() })
    } else {
      this.displayInvalidEmailError()
    }
  }

  displayUserDataError = () => toast.error('Invalid credentials', { autoClose: 2000 })

  displayInvalidEmailError = () => toast.error('Invalid e-mail', { autoClose: 2000 })

  displayUserAuthenticatedMsg = () => {
    const { history } = this.props
    toast.success('Authenticated!', {
      autoClose: 1000,
      onClose: () => history.push('/')
    })
  }

  render() {
    return (
      <>
        <ToastContainer/>
        <TitleBar title={'Eco Lab CMS Login'} color={EcoLabColors.blue}/>
        <br/>
        <div className='padding-div-10'>
          <div
            className='center-float'
            style={{
              backgroundColor: '#0088CE',
              width: '300px', height: '280px',
              // borderRadius: '3px',
              textAlign: 'center',
              border: 'none',
              color: '#fff'
            }}>
            <br/>
            <div className='padding-div-10'>
              <div
                style={{
                  fontSize: '1.25rem',
                  fontFamily: 'interstateregular_comp'
                }}><b>Login</b></div>
              <br/>
              <div
                style={{
                  paddingTop: '10px',
                  display: 'inline-block',
                  fontSize: '1.25rem',
                  marginRight: '10px'
                }}>
                  Email:
              </div>
              <TextFieldWithEcoStyles
                type='text'
                // label='email'
                variant='outlined'
                onChange={this.onEmailInput}
                value={this.state.email}/>
            </div>
              <br/>
            <div>
              <div
                style={{
                  paddingTop: '10px',
                  display: 'inline-block',
                  fontSize: '1.25rem',
                  marginRight: '10px'
                }}>
                  Password:
              </div>
              <TextFieldWithEcoStyles
                type='password'
                // label='password'
                variant='outlined'
                onChange={this.onPasswordInput}
                value={this.state.password}/>
              <br/>
              <br/>
            </div>
            <ButtonWithEcoStyles
              border='true'
              variant='contained'
              onClick={this.onFormSubmit}>
              Submit
            </ButtonWithEcoStyles>
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(AppAuth))
