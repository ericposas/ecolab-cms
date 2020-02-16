import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import Button from '@material-ui/core/Button'
import CreateCompany from '../Pages/CreateCompany'

class EditCompanyModal extends Component {

  render () {
    const { CompanySelectedForEdit } = this.props
    return (
      <>
        <div className='fullscreen-darken' onClick={() => this.props.displayEditModal(false)}></div>
        <div className='center-float' style={{ width: '600px', height: '95%', textAlign: 'center', borderRadius: '4px' }}>
          <div>
            Edit Company: { CompanySelectedForEdit ? CompanySelectedForEdit.name : null }
          </div>
          <div className='padding-div-10' style={{ display: 'inline-block' }}>
            <Button
              style={{ float: 'right' }}
              onClick={() => this.props.displayEditModal(false)}
              variant='contained'
              color='secondary'>
              Cancel
            </Button>
            <CreateCompany placement='edit-company' displayEditModal={this.props.displayEditModal}/>
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(EditCompanyModal)
