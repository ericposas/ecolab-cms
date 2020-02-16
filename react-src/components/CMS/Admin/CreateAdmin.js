import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import validator from 'email-validator'
import axios from 'axios'

class CreateAdmin extends Component {

  state = {
    nameValue: '',
    emailValue: '',
    showAdminCreatedMsg: false,
    showAdminCreateError: false,
    showInvalidEmailError: false
  }

  componentDidMount() {
    const { checkAuth, setAdminData, history } = this.props
    checkAuth(data => {
      const { auth, owner, name, email } = data.data
      if (auth) setAdminData(auth, owner, name, email)
      else history.push('/')
    })
  }

  componentWillUnmount() {
    if (this.displayAdminCreatedMsgTimer) clearTimeout(this.displayAdminCreatedMsgTimer)
    if (this.displayAdminCreateErrorTimer) clearTimeout(this.displayAdminCreateErrorTimer)
    if (this.displayInvalidEmailErrorTimer) clearTimeout(this.displayInvalidEmailErrorTimer)
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

  displayAdminCreatedMsg = () => {
    const { history } = this.props
    this.setState({
      ...this.state,
      showAdminCreatedMsg: true
    })
    this.displayAdminCreatedMsgTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        showAdminCreatedMsg: false
      })
      history.push('/users')
    }, 2000)
  }

  displayAdminCreateError = () => {
    this.setState({
      ...this.state,
      showAdminCreateError: true
    })
    this.displayAdminCreateErrorTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        showAdminCreateError: false
      })
    }, 2000)
  }

  displayInvalidEmailError = () => {
    this.setState({
      ...this.state,
      showInvalidEmailError: true
    })
    this.displayAdminCreateErrorTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        showInvalidEmailError: false
      })
    }, 2000)
  }

  submitForm = e => {
    const { history } = this.props
    const { nameValue, emailValue } = this.state //, passwordValue } = this.state
    e.preventDefault()
    if (validator.validate(emailValue)) {
      axios.post('/admins/create', { name: nameValue, email: emailValue })
        .then(data => {
          const { success } = data.data
          if (success) this.displayAdminCreatedMsg()
          else this.displayAdminCreateError()
        })
        .catch(err => console.log({ error: err.errmsg }))
    } else {
      this.displayInvalidEmailError()
    }
  }

  render() {
    const { AdminData } = this.props
    const { showAdminCreatedMsg, showAdminCreateError, showInvalidEmailError } = this.state
    return (
      <>
        {
          showInvalidEmailError
          ? <><div>Invalid email address.</div><br/><br/></>
          : null
        }
        {
          showAdminCreateError
          ? <><div>Admin could not be created.</div><br/><br/></>
          : null
        }
        {
          showAdminCreatedMsg
          ? <><div>Admin created succesfully.</div><br/><br/></>
          : null
        }
        {
          AdminData.auth
          ?
            <>
              <div>Admin - Create New Administrator</div><br/>
              <div>
                <form method='post'>
                  <label>name: &nbsp;</label>
                  <input onChange={this.onNameInput} type='text' value={this.state.nameValue}/><br/>
                  <label>email: &nbsp;</label>
                  <input onChange={this.onEmailInput} type='text' value={this.state.emailValue}/><br/><br/>
                  <input onClick={this.submitForm} type='submit' value='Create User'/>
                </form>
              </div>
            </>
          :
            <div>You need to be an admin to use this page.</div>
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(CreateAdmin)))
