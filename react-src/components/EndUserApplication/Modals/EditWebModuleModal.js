import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import Button from '@material-ui/core/Button'
import ButtonWithEcoStyles from '../UIcomponents/ButtonWithEcoStyles'
import EcoLabColors from '../Colors/EcoLabColors'
import CreateWebModule from '../Pages/CreateWebModule'

class EditWebModuleModal extends Component {

  render () {
    const { WebModuleSelectedForEdit } = this.props
    return (
      <>
        <div className='fullscreen-darken' onClick={() => this.props.displayEditModal(false)}></div>
        <div className='center-float edit-webmodule-modal'>
          <div className='padding-div-10' style={{ display: 'inline-block' }}>
            <ButtonWithEcoStyles
              top='4px'
              left='4px'
              position='absolute'
              textcolor='white'
              backgroundcolor={EcoLabColors.green}
              onClick={() => this.props.displayEditModal(false) }
              variant='contained'
              color='secondary'>
              Cancel
            </ButtonWithEcoStyles>
            <br/>
            <CreateWebModule placement='edit-webmodule' displayEditModal={this.props.displayEditModal}/>
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(EditWebModuleModal)
