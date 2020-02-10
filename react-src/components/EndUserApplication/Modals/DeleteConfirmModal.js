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
        <div className='center-float' style={{ width: '360px', height: '140px', textAlign: 'center', borderRadius: '4px' }}>
          <div className='padding-div-20'>
            <div>Are you sure you want to delete this company?</div>
            <div className='padding-div-10' style={{ display: 'inline-block' }}>
              <Button onClick={this.handleDelete} variant='contained' color='primary'>Yes</Button>
            </div>
            <div className='padding-div-10' style={{ display: 'inline-block' }}>
              <Button onClick={() => this.props.displayDeleteModal(false)} variant='contained' color='secondary'>No</Button>
            </div>
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(DeleteConfirmModal)
