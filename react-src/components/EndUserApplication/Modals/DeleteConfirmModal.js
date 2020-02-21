import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
// import { toast } from 'react-toastify'

class DeleteConfirmModal extends Component {

  handleDelete = () => {
    switch (this.props.type) {
      case 'custommodule': {
        this.props.deleteCustomModule(
          this.props.CustomModuleToDelete,
          () => {
            this.props.getCustomModules()
            this.props.displayDeleteModal(false)
          })
        }
        break;
      case 'webmodule': {
        this.props.deleteWebModule(
          this.props.WebModuleToDelete,
          () => {
            this.props.getWebModules()
            this.props.displayDeleteModal(false)
          })
        }
        break;
      case 'company': {
        this.props.deleteCompany(
          this.props.CompanyToDelete,
          () => {
            this.props.getCompanies()
            this.props.displayDeleteModal(false)
          })
        }
        break;
      case 'tour': {
        this.props.deleteTour(
          this.props.TourToDelete,
          () => {
            this.props.getTours()
            this.props.displayDeleteModal(false)
          })
        }
        break;
      default:
        //
    }
  }

  render() {
    return (
      <>
        <div className='fullscreen-darken' onClick={() => this.props.displayDeleteModal(false)}></div>
        <div className='center-float' style={{ width: '360px', height: '140px', textAlign: 'center', borderRadius: '4px', border: 'none' }}>
          <div className='padding-div-20'>
            <div>Are you sure you want to delete this {this.props.type}?</div>
            {
              this.props.type == 'company'
              ? <div>Deleting this company will also delete all associated Tours</div>
              : null
            }
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
