import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import Toggler from '../UIcomponents/Toggler'
import { Button } from '@material-ui/core'
import { validate } from 'email-validator'
import { toast } from 'react-toastify'
import axios from 'axios'

class UserEditView extends Component {

  state = {
    userName: '',
    userEmail: '',
    userActive: true,
    userFullAccess: false,
    userPeer: false,
    emailSentMsg: false,
    showInvalidEmailErr: false
  }

  componentDidMount() {
    this.setState({
      userName: this.props.SelectedUserForEditing.name,
      userEmail: this.props.SelectedUserForEditing.email,
      userActive: this.props.SelectedUserForEditing.active,
      userFullAccess: this.props.SelectedUserForEditing.full_access,
      userPeer: this.props.SelectedUserForEditing.peer
    })
  }

  componentWillUnmount() {
    if (this.emailSentTimer) clearTimeout(this.emailSentTimer)
  }

  setUserName = e => {
    this.setState({
      ...this.state,
      userName: e.target.value
    })
  }

  setUserEmail = e => {
    this.setState({
      ...this.state,
      userEmail: e.target.value
    })
  }

  sendForgotEmail = () => {
    axios.post('/password/forgot', { email: this.state.userEmail })
      .then(data => {
        console.log(data)
        if (data.data.success) {
          toast.success(
            `Reset password instructions have been emailed to ${this.props.SelectedUserForEditing.name}.`,
            {
              autoClose: 3000
            }
          )
        } else {
          toast.error(
            `Error sending password reset email..`,
            {
              autoClose: 3000
            }
          )
        }
      })
      .catch(err => console.log(err))
  }

  updateDatabase = () => {
    const { SelectedUserForEditing } = this.props
    if (SelectedUserForEditing._id) {
      if (validate(this.state.userEmail)) {
        axios.put(`/users/update/${SelectedUserForEditing._id}`, {
          name: this.state.userName,
          email: this.state.userEmail,
          active: this.state.userActive,
          fullaccess: this.state.userFullAccess,
          peer: this.state.userPeer
        })
          .then(data => {
            console.log(data)
            const { success } = data.data
            if (data.data.success) {
              this.props.setSelectedUserForEditing(null)
              this.props.refreshUsersList()
            } else {
              console.log('something went wrong.')
            }
          })
          .catch(err => console.log(err))
      } else {
        this.displayInvalidEmailError()
      }
    }
  }

  displayInvalidEmailError = () => {
    this.setState({
      ...this.state,
      showInvalidEmailErr: true
    })
    this.displayInvalidEmailErrorTimer = setTimeout(() => {
      this.setState({
        ...this.state,
        showInvalidEmailErr: false
      })
    }, 2000)
  }

  render() {
    const { setSelectedUserForEditing, SelectedUserForEditing } = this.props
    return (
      <>
        <div
          className='fullscreen-darken'
          onClick={() => setSelectedUserForEditing(null)}></div>
        <div
          className='modal-user-edit-view-container center-float'
          style={{ width: '500px', height: '540px', fontFamily: 'arial' }}
          >
          <div className='modal-user-edit-title-ribbon'>
            Edit Application User: &nbsp;
            {SelectedUserForEditing ? SelectedUserForEditing.name : null}
          </div>
          <div className='padding-div-10'>
            <div>Name</div>
            <input type='text' onChange={this.setUserName} value={this.state.userName}/>
          </div>
          <div className='padding-div-10'>
            <div>Email</div>
            <input type='text' onChange={this.setUserEmail} value={this.state.userEmail}/>
          </div>
          <div className='padding-div-10'>
            <Button
              style={{
                color: '#FFF',
                backgroundColor: 'red'
              }}
              variant='contained'
              onClick={this.sendForgotEmail}
              >
              Reset {this.state.userName}'s password
            </Button>
          </div>
          <div className='padding-div-10'>
            <div>Active</div>
            <Toggler clickHandler={() => this.setState({ ...this.state, userActive: !this.state.userActive })} toggleValue={this.state.userActive}/>
          </div>
          <div className='padding-div-10'>
            <div>Full Access?</div>
            <Toggler clickHandler={() => this.setState({ ...this.state, userFullAccess: !this.state.userFullAccess })} toggleValue={this.state.userFullAccess}/>
          </div>
          <div className='padding-div-10'>
            <div>Peer?</div>
            <Toggler clickHandler={() => this.setState({ ...this.state, userPeer: !this.state.userPeer })} toggleValue={this.state.userPeer}/>
          </div>
          <br/>
          <br/>
          <div className='padding-div-10'>
            <Button
              style={{
                color: '#FFF',
                backgroundColor: '#000'
              }}
              onClick={this.updateDatabase}
              variant='contained'
              color='primary'
            >
              Save Changes
            </Button>
            <Button
            style={{ marginLeft: '10px' }}
            onClick={() => this.props.setSelectedUserForEditing(null)}
            color='default'
            variant='contained'
            >
              Cancel
            </Button>
          </div>
        </div>
        {
          this.state.emailSentMsg
          ?
            <div className='center-float' style={{ width: '300px', height: '200px' }}>
              Password reset instructions have been sent to {this.state.userName}'s email address
            </div>
          : null
        }
        {
          this.state.showInvalidEmailErr
          ? <>
              <div className='center-float' style={{ width: '300px', height: '200px' }}>
                Invalid email, please input a correct email address.
              </div>
            </>
          : null
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(UserEditView)
