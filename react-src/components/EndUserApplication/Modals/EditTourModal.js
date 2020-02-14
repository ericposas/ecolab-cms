import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../../HOC/withAppUserAuth'
import Button from '@material-ui/core/Button'
import CreateTour from '../Pages/CreateTour'

class EditTourModal extends Component {

  render () {
    const { TourSelectedForEdit } = this.props
    return (
      <>
        <div className='fullscreen-darken'></div>
        <div className='center-float' style={{ width: '360px', height: '100%', textAlign: 'center', borderRadius: '4px' }}>
          <div>
            Edit Tour: { TourSelectedForEdit ? TourSelectedForEdit.name : null }
          </div>
          <CreateTour placement='edit-tour' displayEditModal={this.props.displayEditModal}/>
          <div className='padding-div-10' style={{ display: 'inline-block' }}>
            <Button onClick={() => this.props.displayEditModal(false)} variant='contained' color='secondary'>
              Cancel
            </Button>
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(EditTourModal)
