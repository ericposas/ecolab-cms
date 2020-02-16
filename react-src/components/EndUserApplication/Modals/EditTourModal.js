import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import Button from '@material-ui/core/Button'
import CreateTour from '../Pages/CreateTour'

class EditTourModal extends Component {

  render () {
    const { TourSelectedForEdit } = this.props
    return (
      <>
        <div className='fullscreen-darken' onClick={() => this.props.displayEditModal(false)}></div>
        <div className='center-float edit-tour-modal'>
          {/*<div>
            Edit Tour: { TourSelectedForEdit ? TourSelectedForEdit.name : null }
          </div>*/}
          <div className='padding-div-10' style={{ display: 'inline-block' }}>
            <Button
              style={{ position: 'absolute', top: '4px', right: '4px' }}
              onClick={() => this.props.displayEditModal(false)}
              variant='contained'
              color='secondary'>
              Cancel
            </Button>
            <br/>
            <CreateTour placement='edit-tour' displayEditModal={this.props.displayEditModal}/>
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(EditTourModal)
