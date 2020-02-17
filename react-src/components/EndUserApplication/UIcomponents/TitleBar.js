import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import Button from '@material-ui/core/Button'
import axios from 'axios'

class TitleBar extends Component {

  render () {
    const { AppUserData } = this.props
    const logoutAreaStyle = {
      top: 0, right: 0, position: 'absolute',
    }
    return (
      <>
        <div
          className={'ui-title-bar'}
          style={{
            backgroundColor: this.props.color || 'lightblue'
          }}>
          {this.props.title}
        </div>
        <div style={logoutAreaStyle}>
          <div className='padding-div-20' style={{ display: 'inline-block' }}>Welcome {AppUserData ? AppUserData.name : null}</div>
          <Button onClick={() => this.props.history.push('/logout/user')} variant='contained' style={{ marginRight: '4px' }}>log out</Button>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(TitleBar))
