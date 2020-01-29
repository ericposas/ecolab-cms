import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import Toggler from '../UIcomponents/Toggler'
import axios from 'axios'
// import bcrypt from 'bcrypt'

class UserEditView extends Component {

  state = {
    userName: '',
    userEmail: '',
    // userPassword: '',
    userActive: true,
    emailSentMsg: false
  }

  componentDidMount() {
    // console.log(this.props.SelectedUserForEditing)
    this.setState({
      userName: this.props.SelectedUserForEditing.name,
      userEmail: this.props.SelectedUserForEditing.email,
      // userPassword: this.props.SelectedUserForEditing.password,
      userActive: this.props.SelectedUserForEditing.active
    })
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

  // setUserPassword = e => {
  //   this.setState({
  //     ...this.state,
  //     userPassword: e.target.value
  //   })
  // }

  sendForgotEmail = () => {
    axios.post('/password/forgot', { email: this.state.userEmail })
      .then(data => {
        console.log(data)
        if (data.data.success) {
          this.setState({
            ...this.state,
            emailSentMsg: true
          })
          setTimeout(() => {
            this.setState({
              ...this.state,
              emailSentMsg: false
            })
          }, 3000)
        }
      })
      .catch(err => console.log(err))
  }

  // generateHash = () => {
  //   //
  // }

  userActiveToggle = () => {
    console.log(!this.state.userActive)
    this.setState({
      ...this.state,
      userActive: !this.state.userActive
    })
  }

  updateDatabase = () => {
    const { SelectedUserForEditing } = this.props
    if (SelectedUserForEditing._id) {
      axios.put(`/users/update/${SelectedUserForEditing._id}`, { name: this.state.userName, email: this.state.userEmail, active: this.state.userActive })
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
    }
  }

  render() {
    const { setSelectedUserForEditing, SelectedUserForEditing } = this.props
    return (
      <>
        <div
          className='fullscreen-darken'
          onClick={() => setSelectedUserForEditing(null)}></div>
        <div
          style={{ width: '500px', height: '500px' }}
          className='modal-user-edit-view-container center-float'>
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
          {/*<div className='padding-div-10'>
            <div>Password</div>
            <input type='text' onChange={this.setUserPassword} value={this.state.userPassword}/>
          </div>*/}
          <div className='padding-div-10'>
            <button onClick={this.sendForgotEmail}>Reset {this.state.userName}'s password</button>
          </div>
          <div className='padding-div-10'>
            <div>Active</div>
            <Toggler clickHandler={this.userActiveToggle} toggleValue={this.state.userActive}/>
          </div>
          <br/>
          <br/>
          <div className='padding-div-10'>
            <button onClick={this.updateDatabase}>Save Changes</button>
            <button onClick={() => this.props.setSelectedUserForEditing(null)}>Cancel</button>
          </div>
        </div>
        {
          this.state.emailSentMsg
          ?
            <div className='center-float'>
              Password reset instructions have been sent to {this.state.userName}'s email address
            </div>
          : null
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(UserEditView)
