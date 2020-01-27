import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../mapStateMapDispatch'

class User extends Component {

  state = {
    // checkBoxState: false
  }

  toggleCheckBox = user => {
    const {
      selectUserForBulkAction,
      deselectUserForBulkAction,
      BulkActionSelectedUsers
    } = this.props
    if (BulkActionSelectedUsers.includes(user)) {
      deselectUserForBulkAction(user)
      // this.setState({
      //   ...this.state,
      //   checkBoxState: false
      // })
    } else {
      selectUserForBulkAction(user)
      // this.setState({
      //   ...this.state,
      //   checkBoxState: true
      // })
    }
  }

  render() {
    const { count, deleteUser, user, BulkActionSelectedUsers } = this.props
    return (
      <>
        <div
          className={'user-component-container row'}
          style={{
            backgroundColor: count % 2 == 0 && count != 0 ? '#ccc' : '#ededed'
          }}>
          {/*
            <div
              className={'user-component-delete-button'}
              onClick={deleteUser}>
                &#10060;
            </div>
          */}
          <div className={'col-5'}>
            <div className={'user-component-name'}>{user.name}</div>
          </div>
          <div className={'col-5'}>
            <div className={'user-component-email'}>{user.email}</div>
          </div>
          <input
            type='checkbox'
            className={'user-component-checkbox'}
            onChange={() => this.toggleCheckBox(user.name)}
            checked={BulkActionSelectedUsers.includes(user.name)}/>
        </div>
        <br/>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(User)
