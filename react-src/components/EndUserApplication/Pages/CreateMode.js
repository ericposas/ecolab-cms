import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import axios from 'axios'

class CreateMode extends Component {

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

  render() {
    const grnblue = '#00ffae'
    const { history } = this.props
    return (
      <>
        <TitleBar title={'Eco Lab Application'} color={grnblue}/>
        <div className='center-float'
          style={{ width: '80%', height: '600px', border: 'none' }}>
          <div className='dashboard-button-large' style={{ backgroundColor: grnblue }}>Custom Module</div>
          <div className='dashboard-button-large' onClick={() => history.push('/create-company')} style={{ backgroundColor: grnblue }}>Add a Company</div>
          <div className='dashboard-button-large' onClick={() => history.push('/create-web-module')} style={{ backgroundColor: grnblue }}>Web Module</div>
          <div className='dashboard-button-large' onClick={() => history.push('/create-tour')} style={{ backgroundColor: grnblue }}>Tour Module</div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(withAppUserAuth(CreateMode)))
