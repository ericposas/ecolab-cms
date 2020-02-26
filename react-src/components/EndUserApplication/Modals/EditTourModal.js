import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import Button from '@material-ui/core/Button'
import CreateTour from '../Pages/CreateTour'
import ButtonWithEcoStyles from '../UIcomponents/ButtonWithEcoStyles'
import TextFieldWithEcoStylesDark from '../UIcomponents/TextFieldWithEcoStylesDark'
import EcoLabColors from '../Colors/EcoLabColors'

class EditTourModal extends Component {

  render () {
    const { TourSelectedForEdit } = this.props
    return (
      <>
        <div className='fullscreen-darken' onClick={() => this.props.displayEditModal(false)}></div>
        <div className='center-float edit-tour-modal'>
          <div className='padding-div-10' style={{ display: 'inline-block' }}>
            <ButtonWithEcoStyles
              top='4px'
              left='4px'
              position='absolute'
              onClick={() => this.props.displayEditModal(false)}
              variant='contained'
              textcolor='white'
              backgroundcolor={EcoLabColors.green}
              >
              Cancel
            </ButtonWithEcoStyles>
            <br/>
            <CreateTour placement='edit-tour' displayEditModal={this.props.displayEditModal}/>
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(EditTourModal)
