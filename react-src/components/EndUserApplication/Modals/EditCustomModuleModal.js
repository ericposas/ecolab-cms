import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import Button from '@material-ui/core/Button'
import CreateCustomModule from '../Pages/CreateCustomModule'

class EditCustomModuleModal extends Component {

  render () {
    return (
      <>
        <div className='fullscreen-darken' onClick={() => this.props.displayEditModal(false)}></div>
        <div className='center-float edit-custommodule-modal'>
          <div className='padding-div-10' style={{ display: 'inline-block' }}>
            <Button
              style={{ position: 'absolute', top: '4px', right: '4px' }}
              onClick={() => this.props.displayEditModal(false) }
              variant='contained'
              color='secondary'>
              Cancel
            </Button>
            <br/>
            <CreateCustomModule placement='edit-webmodule' displayEditModal={this.props.displayEditModal}/>
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(EditCustomModuleModal)
