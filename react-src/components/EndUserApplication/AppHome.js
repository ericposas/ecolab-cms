import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import Button from '@material-ui/core/Button'
import axios from 'axios'

class AppHome extends Component {

  componentDidMount() {
    const { checkAppUserAuth, setAppUserData, AppUserData, history } = this.props
    checkAppUserAuth(data => {
      console.log(data.data)
      const { auth, fullaccess, peer, name, email } = data.data
      if (!auth) history.push('/login')
      else {
        if (!AppUserData.auth) setAppUserData(auth, fullaccess, peer, name, email)
      }
    })
  }

  logout = () => {
    this.props.history.push('/logout/user')
  }

  render() {
    const { AppUserData, history } = this.props
    const grnblue = '#00ffae'
    const logoutAreaStyle = {
      top: 0, right: 0, position: 'absolute',
    }
    return (
      <>
        <TitleBar title={'Eco Lab Application'} color={'#00ffae'}/>
        <div style={logoutAreaStyle}>
          <div className='padding-div-20' style={{ display: 'inline-block' }}>Welcome {AppUserData.name ? AppUserData.name : null}</div>
          <Button onClick={this.logout} variant='contained' style={{ marginRight: '4px' }}>log out</Button>
        </div>
        <div className='center-float' style={{ top: '40px', width: '80%', height: '500px', border: 'none' }}>
          <div className='dashboard-button-x-large' style={{ backgroundColor: grnblue }} onClick={() => history.push('/create-mode')}>Create Mode</div>
          <div className='dashboard-button-x-large' style={{ backgroundColor: grnblue }}>Edit Mode</div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(withAppUserAuth(AppHome)))
