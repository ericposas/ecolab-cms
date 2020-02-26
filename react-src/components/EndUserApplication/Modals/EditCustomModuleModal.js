import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import ButtonWithEcoStyles from '../UIcomponents/ButtonWithEcoStyles'
import EcoLabColors from '../Colors/EcoLabColors'
import CreateCustomModule from '../Pages/CreateCustomModule'

class EditCustomModuleModal extends Component {

  render () {
    return (
      <>
        <div className='fullscreen-darken' onClick={() => this.props.displayEditModal(false)}></div>
        <div className='center-float edit-custommodule-modal'>
          <div className='padding-div-10' style={{ display: 'inline-block' }}>
            <ButtonWithEcoStyles
              top='4px'
              left='4px'
              position='absolute'
              textcolor='white'
              backgroundcolor={EcoLabColors.green}
              onClick={() => this.props.displayEditModal(false) }
              variant='contained'
              >
              Cancel
            </ButtonWithEcoStyles>
            <br/>
            <CreateCustomModule placement='edit-custom-module' displayEditModal={this.props.displayEditModal}/>
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(EditCustomModuleModal)
