import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'

class DeleteConfirmModal extends Component {

  handleDelete = () => {
    this.props.deleteCompany(
      this.props.CompanyToDelete,
      () => {
        this.props.getCompanies()
        this.props.displayDeleteModal(false)
      }
    )
  }

  render() {
    return (
      <>
        <div className='fullscreen-darken'></div>
        <div className='center-float'>
          <div className='padding-div-20'>
            <div>Are you sure you want to delete this company?</div>
            <Button onClick={this.handleDelete} variant='contained' color='primary'>Yes</Button>
            <Button onClick={() => this.props.displayDeleteModal(false)} variant='contained' color='secondary'>No</Button>
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(DeleteConfirmModal)
