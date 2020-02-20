import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import Toggler from '../UIcomponents/Toggler'
import { validate } from 'email-validator'
import axios from 'axios'

class AdminEditView extends Component {

  state = {
    adminName: '',
    adminEmail: '',
    adminOwner: true,
    emailSentMsg: false,
    showInvalidEmailErr: false
  }

  componentDidMount() {
    this.setState({
      adminName: this.props.SelectedAdminForEditing.name,
      adminEmail: this.props.SelectedAdminForEditing.email,
      adminOwner: this.props.SelectedAdminForEditing.owner
    })
  }

  componentWillUnmount() {
    if (this.emailSentTimer) clearTimeout(this.emailSentTimer)
  }

  setAdminName = e => {
    this.setState({
      ...this.state,
      adminName: e.target.value
    })
  }

  setAdminEmail = e => {
    this.setState({
      ...this.state,
      adminEmail: e.target.value
    })
  }

  sendForgotEmail = () => {
    axios.post('/password/forgot', { email: this.state.adminEmail, admin: true })
      .then(data => {
        console.log(data)
        if (data.data.success) {
          this.setState({
            ...this.state,
            emailSentMsg: true
          })
          this.emailSentTimer = setTimeout(() => {
            this.setState({
              ...this.state,
              emailSentMsg: false
            })
          }, 3000)
        }
      })
      .catch(err => console.log(err))
  }

  adminOwnerToggle = () => {
    console.log(!this.state.adminOwner)
    this.setState({
      ...this.state,
      adminOwner: !this.state.adminOwner
    })
  }

  // save function
  updateDatabase = () => {
    const { SelectedAdminForEditing } = this.props
    if (SelectedAdminForEditing._id) {
      if (validate(this.state.adminEmail)) {
        axios.put(`/admins/update/${SelectedAdminForEditing._id}`, { name: this.state.adminName, email: this.state.adminEmail, owner: this.state.adminOwner })
          .then(data => {
            console.log(data)
            const { success } = data.data
            if (data.data.success) {
              this.props.setSelectedAdminForEditing(null)
              this.props.refreshAdminsList()
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
    const { setSelectedAdminForEditing, SelectedAdminForEditing } = this.props
    return (
      <>
        <div
          className='fullscreen-darken'
          onClick={() => setSelectedAdminForEditing(null)}></div>
        <div
          style={{ width: '500px', height: '440px' }}
          className='modal-user-edit-view-container center-float'>
          <div className='modal-user-edit-title-ribbon'>
            Edit Application User: &nbsp;
            {SelectedAdminForEditing ? SelectedAdminForEditing.adminName : null}
          </div>
          <div className='padding-div-10'>
            <div>Name</div>
            <input type='text' onChange={this.setAdminName} value={this.state.adminName}/>
          </div>
          <div className='padding-div-10'>
            <div>Email</div>
            <input type='text' onChange={this.setAdminEmail} value={this.state.adminEmail}/>
          </div>
          <div className='padding-div-10'>
            <button onClick={this.sendForgotEmail}>Reset {this.state.adminName}'s password</button>
          </div>
          <div className='padding-div-10'>
            <div>Owner</div>
            <Toggler clickHandler={this.adminOwnerToggle} toggleValue={this.state.adminOwner}/>
          </div>
          <br/>
          <br/>
          <div className='padding-div-10'>
            <button onClick={this.updateDatabase}>Save Changes</button>
            <button onClick={() => this.props.setSelectedAdminForEditing(null)}>Cancel</button>
          </div>
        </div>
        {
          this.state.emailSentMsg
          ?
            <div className='center-float' style={{ width: '300px', height: '200px' }}>
              Password reset instructions have been sent to {this.state.adminName}'s email address
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

export default connect(mapState, mapDispatch)(AdminEditView)
