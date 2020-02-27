import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'

class User extends Component {

  state = {}

  toggleCheckBox = user => {
    const {
      selectUserForBulkAction,
      deselectUserForBulkAction,
      BulkActionSelectedUsers
    } = this.props
    if (BulkActionSelectedUsers.includes(user)) {
      deselectUserForBulkAction(user)
    } else {
      selectUserForBulkAction(user)
    }
  }

  userEditClick = user => {
    console.log('should go into edit user mode for ' + user.name)
    this.props.setSelectedUserForEditing(user)
  }

  render() {
    const { count, user, BulkActionSelectedUsers } = this.props
    return (
      <>
        <div
          className={'user-component-container row'}
          style={{ fontFamily: 'arial' }}
          >
          <div className={'col-5 user-component-name'}>{user.name}</div>
          <div className={'col-5 user-component-email'}>{user.email}</div>
          <div
            className='user-edit-clickable-region'
            onClick={() => this.userEditClick(user)}></div>
          <input
            type='checkbox'
            className={'user-component-checkbox'}
            onChange={() => this.toggleCheckBox(user._id)}
            checked={BulkActionSelectedUsers.includes(user._id)}/>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(User)
