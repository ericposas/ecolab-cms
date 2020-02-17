import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import Button from '@material-ui/core/Button'
import CreateCompany from '../Pages/CreateCompany'

class EditCompanyModal extends Component {

  handleCloseModal = () => {
    this.props.setCompanyToEdit(null)
    this.props.displayEditModal(false)
  }

  render () {
    const { CompanySelectedForEdit } = this.props
    return (
      <>
        <div className='fullscreen-darken' onClick={this.handleCloseModal}></div>
        <div className='center-float edit-company-modal'>
          {/*<div>
            Edit Company: { CompanySelectedForEdit ? CompanySelectedForEdit.name : null }
          </div>*/}
          <div className='padding-div-10' style={{ display: 'inline-block' }}>
            <Button
              style={{ position: 'absolute', top: '4px', right: '4px' }}
              onClick={this.handleCloseModal}
              variant='contained'
              color='secondary'>
              Cancel
            </Button>
            <br/>
            <CreateCompany placement='edit-company' displayEditModal={this.props.displayEditModal}/>
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(EditCompanyModal)
