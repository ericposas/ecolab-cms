import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'

class Admin extends Component {

  state = {}

  toggleCheckBox = admin => {
    const {
      selectAdminForBulkAction,
      deselectAdminForBulkAction,
      BulkActionSelectedAdmins
    } = this.props
    if (BulkActionSelectedAdmins.includes(admin)) {
      deselectAdminForBulkAction(admin)
    } else {
      selectAdminForBulkAction(admin)
    }
  }

  render() {
    const { count, admin, BulkActionSelectedAdmins } = this.props
    return (
      <>
        <div
          className={'user-component-container row'}>
          <div className={'col-5 user-component-name'}>{admin.name}</div>
          <div className={'col-5 user-component-email'}>{admin.email}</div>
          <input
            type='checkbox'
            className={'user-component-checkbox'}
            onChange={() => this.toggleCheckBox(admin._id)}
            checked={BulkActionSelectedAdmins.includes(admin._id)}/>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(Admin)