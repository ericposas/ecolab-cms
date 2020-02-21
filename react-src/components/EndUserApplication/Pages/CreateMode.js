import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import { ToastContainer } from 'react-toastify'
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
    const { history } = this.props
    return (
      <>
        <ToastContainer/>
        <TitleBar title={'Eco Lab Application'}/>
        <div className='center-float'
          style={{ width: '80%', height: '600px', border: 'none', backgroundColor: 'rgba(0,0,0,0)' }}>
          <div className='dashboard-button-large' onClick={() => history.push('/create-custom-module')}>Create a Custom Module</div>
          <div className='dashboard-button-large' onClick={() => history.push('/create-company')}>Add a Company</div>
          <div className='dashboard-button-large' onClick={() => history.push('/create-web-module')}>Create a Web Module</div>
          <div className='dashboard-button-large' onClick={() => history.push('/create-tour')}>Create a Tour</div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(withAppUserAuth(CreateMode)))
