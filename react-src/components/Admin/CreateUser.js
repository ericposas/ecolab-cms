import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'

class CreateUser extends Component {

  state = {
    nameValue: '',
    emailValue: '',
    passwordValue: '',
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

  onPasswordInput = e => {
    this.setState({
      ...this.state,
      passwordValue: e.target.value
    })
  }

  submitForm = e => {
    e.preventDefault()
    axios.post('/users/create', {
      name: this.state.nameValue,
      email: this.state.emailValue,
      password: this.state.passwordValue
    })
    .then(data => {
      if (data.data == 'success') {
        this.setState({
          ...this.state,
          showUserCreatedMsg: true
        })
        setTimeout(() => {
          this.setState({
            ...this.state,
            showUserCreatedMsg: false
          })
          this.props.history.push('/')
        }, 2000)
      }
      else console.log(data.data)
    })
    .catch(err => console.log(err))
  }

  render() {
    const { AdminData } = this.props
    const { showUserCreatedMsg } = this.state
    return (
      <>
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
                  <label>password: &nbsp;</label>
                  <input onChange={this.onPasswordInput} type='password' value={this.state.passwordValue}/><br/>
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
