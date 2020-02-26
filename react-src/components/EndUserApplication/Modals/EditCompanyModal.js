import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import ButtonWithEcoStyles from '../UIcomponents/ButtonWithEcoStyles'
import EcoLabColors from '../Colors/EcoLabColors'
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
          <div className='padding-div-10' style={{ display: 'inline-block' }}>
            <ButtonWithEcoStyles
              top='4px'
              left='4px'
              position='absolute'
              textcolor='white'
              backgroundcolor={EcoLabColors.green}
              onClick={this.handleCloseModal}
              >
              Cancel
            </ButtonWithEcoStyles>
            <br/>
            <CreateCompany placement='edit-company' displayEditModal={this.props.displayEditModal}/>
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(EditCompanyModal)
