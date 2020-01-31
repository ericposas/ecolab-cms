import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import withAppUserAuth from '../HOC/withAppUserAuth'
import TitleBar from '../UIcomponents/TitleBar'
import axios from 'axios'

class AppHome extends Component {

  componentDidMount() {
    const { checkAppUserAuth, setAppUserData, AppUserData, history } = this.props
    checkAppUserAuth(data => {
      console.log(data.data)
      const { auth, name, email } = data.data
      if (!auth) history.push('/login')
      else {
        if (!AppUserData.auth) setAppUserData(auth, name, email)
      }
    })
  }

  logout = () => {
    this.props.history.push('/logout/user')
  }

  render() {
    const { AppUserData } = this.props
    return (
      <>
        <TitleBar title={'Application Frontend'} color={'#00ffae'}/>
        <button
          style={{
            top: '10px', right: '10px',
            position: 'absolute',
          }}
          onClick={this.logout}>log out</button>
        <div className='padding-div-20'>Welcome {AppUserData.name ? AppUserData.name : null}</div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withRouter(withAppUserAuth(AppHome)))
