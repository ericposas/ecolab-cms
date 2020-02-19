import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
// import { toast } from 'react-toastify'

class DeleteConfirmModal extends Component {

  handleDelete = () => {
    switch (this.props.type) {
      case 'custommodule': {
        // let toastId = toast('Deleting custom module..', { type: toast.TYPE.WARNING, autoClose: 2000 })
        this.props.deleteCustomModule(
          this.props.CustomModuleToDelete,
          () => {
            // toast.dismiss(toastId)
            // toast.success('Custom module deleted!', { autoClose: 1000 })
            this.props.getCustomModules()
            this.props.displayDeleteModal(false)
          })
        }
        break;
      case 'webmodule': {
        // let toastId = toast('Deleting web module..', { type: toast.TYPE.WARNING, autoClose: 2000 })
        this.props.deleteWebModule(
          this.props.WebModuleToDelete,
          () => {
            // toast.dismiss(toastId)
            // toast.success('Web module deleted!', { autoClose: 1000 })
            this.props.getWebModules()
            this.props.displayDeleteModal(false)
          })
        }
        break;
      case 'company': {
        // let toastId = toast('Deleting company..', { type: toast.TYPE.WARNING, autoClose: 2000 })
        this.props.deleteCompany(
          this.props.CompanyToDelete,
          () => {
            // toast.dismiss(toastId)
            // toast.success('Company deleted!', { autoClose: 1000 })
            this.props.getCompanies()
            this.props.displayDeleteModal(false)
          })
        }
        break;
      case 'tour': {
        // let toastId = toast('Deleting tour module..', { type: toast.TYPE.WARNING, autoClose: 2000 })
        this.props.deleteTour(
          this.props.TourToDelete,
          () => {
            // toast.dismiss(toastId)
            // toast.success('Tour module deleted!', { autoClose: 1000 })
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
