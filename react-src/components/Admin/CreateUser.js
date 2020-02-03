import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import validator from 'email-validator'
import axios from 'axios'

class CreateUser extends Component {

  state = {
    nameValue: '',
    emailValue: '',
    showUserCreatedMsg: false,
    showUserCreateError: false,
    showInvalidEmailMsg: false
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
    if (this.userCreatedMsgTimer) clearTimeout(this.userCreatedMsgTimer)
    if (this.userCreateErrorTimer) clearTimeout(this.userCreateErrorTimer)
    if (this.displayInvalidEmailMsgTimer) clearTimeout(this.displayInvalidEmailMsgTimer)
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

  displayInvalidEmailMsg = () => {
    this.setState({
      ...this.state,
      showInvalidEmailMsg: true
    })
    this.displayInvalidEmailMsgTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        showInvalidEmailMsg: false
      })
    }, 2000)
  }

  displayUserCreatedMsg = () => {
    const { history } = this.props
    this.setState({
      ...this.state,
      showUserCreatedMsg: true
    })
    this.userCreatedMsgTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        showUserCreatedMsg: false
      })
      history.push('/users')
    }, 2000)
  }

  displayUserCreateErrorMsg = () => {
    this.setState({
      ...this.state,
      showUserCreateError: true
    })
    this.userCreateErrorTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        showUserCreateError: false
      })
    }, 2000)
  }

  submitForm = e => {
    const { history } = this.props
    const { nameValue, emailValue } = this.state
    e.preventDefault()
    if (validator.validate(this.state.emailValue)) {
      axios.post('/users/create', { name: nameValue, email: emailValue })
        .then(data => {
          const { success } = data.data
          if (success) this.displayUserCreatedMsg()
          else this.displayUserCreateErrorMsg()
        })
        .catch(err => console.log({ error: err.errmsg }))
    } else {
      this.displayInvalidEmailMsg()
    }
  }

  render() {
    const { AdminData } = this.props
    const { showUserCreatedMsg, showUserCreateError, showInvalidEmailMsg } = this.state
    return (
      <>
        {
          showInvalidEmailMsg
          ? <><div>Invalid email address.</div></>
          : null
        }
        {
          showUserCreateError
          ? <><div>User could not be created.</div></>
          : null
        }
        {
          showUserCreatedMsg
          ? <><div>User created succesfully.</div><br/><br/></>
          : null
        }
        {
          AdminData.auth
          ?
            <>
              <div>Admin - Create New User</div>
              <div>
                <form method='post'>
                  <label>name: &nbsp;</label>
                  <input onChange={this.onNameInput} type='text' value={this.state.nameValue}/><br/>
                  <label>email: &nbsp;</label>
                  <input onChange={this.onEmailInput} type='text' value={this.state.emailValue}/><br/>
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

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(CreateUser)))
