import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import { TextField, Button } from '@material-ui/core'
import validator from 'email-validator'
import { toast } from 'react-toastify'
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

  submitForm = e => {
    const { history } = this.props
    const { nameValue, emailValue } = this.state
    e.preventDefault()
    if (validator.validate(this.state.emailValue)) {
      axios.post('/users/create', { name: nameValue, email: emailValue })
        .then(data => {
          const { success } = data.data
          if (success) {
            toast.success(`New user ${nameValue} created!`, { autoClose: 1500 })
            this.props.getUsers(() => this.props.setDisplay(false))
          }
          else toast.error('Could not create user.', { autoClose: 2000 })
        })
        .catch(err => console.log({ error: err.errmsg }))
    } else {
      toast.error('Invalid email.', { autoClose: 1500 })
    }
  }

  render() {
    const { AdminData } = this.props
    const { showUserCreatedMsg, showUserCreateError, showInvalidEmailMsg } = this.state
    return (
      <div style={{ fontFamily: 'arial' }}>
        {
          AdminData.auth
          ?
            <>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>Create New User</div>
              <div className='center-float' style={{ width: '240px', height: '200px', border: 'none' }}>
                <br/>
                <div className='padding-div-5'>
                  <TextField variant='outlined' label='name' onChange={this.onNameInput} type='text' value={this.state.nameValue}/><br/>
                </div>
                <div className='padding-div-5'>
                  <TextField variant='outlined' label='email' onChange={this.onEmailInput} type='text' value={this.state.emailValue}/><br/>
                </div>
                <br/>
                <Button
                  style={{
                    color: '#FFF',
                    backgroundColor: '#000'
                  }}
                  variant='contained'
                  onClick={this.submitForm} type='submit'
                  >
                  Create User
                </Button>
                <Button style={{ marginLeft: '4px' }} variant='contained' color='default' onClick={() => this.props.setDisplay(false)} type='submit'>
                  Cancel
                </Button>
              </div>
            </>
          :
            <div>You need to be an admin to use this page.</div>
        }
      </div>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(CreateUser)))
