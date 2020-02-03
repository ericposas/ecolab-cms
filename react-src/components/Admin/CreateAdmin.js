import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'

class CreateAdmin extends Component {

  state = {
    nameValue: '',
    emailValue: '',
    showUserCreatedMsg: false
  }

  componentDidMount() {
    const { checkAuth, setAdminData, history } = this.props
    checkAuth(data => {
      const { auth, name, email } = data.data
      if (auth) setAdminData(auth, name, email)
      else history.push('/')
    })
  }

  componentWillUnmount() {
    if (this.userCreatedMsgTimer) clearTimeout(this.userCreatedMsgTimer)
    if (this.userCreateErrorTimer) clearTimeout(this.userCreateErrorTimer)
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

  submitForm = e => {
    const { history } = this.props
    const { nameValue, emailValue } = this.state //, passwordValue } = this.state
    e.preventDefault()
    axios.post('/admins/create', {
      name: nameValue,
      email: emailValue
      // password: passwordValue
    })
    .then(data => {
      const { success } = data.data
      if (success) {
        console.log(success)
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
      } else {
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
    })
    .catch(err => console.log({ error: err.errmsg }))
  }

  render() {
    const { AdminData } = this.props
    const { showUserCreatedMsg, showUserCreateError } = this.state
    return (
      <>
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
                  {/*<label>password: &nbsp;</label>
                  <input onChange={this.onPasswordInput} type='password' value={this.state.passwordValue}/><br/>*/}
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
