import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'

class Home extends Component {

  componentDidMount() {
    const { checkAuth, dispatch, setAuthStatus, setUserData } = this.props
    checkAuth(data => {
      if (data.data.auth == true) {
        setAuthStatus(true)
        setUserData(data.data.name, data.data.email)
      } else {
        setAuthStatus(false)
      }
    })
  }

  render() {
    const { AuthStatus, UserData } = this.props
    return (
      <>
        <div>
          {
            AuthStatus && UserData.name
            ? <><div>Welcome {UserData.name}</div></>
            : <><div>Home - mode:{process.env.MODE}</div></>
          }
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(Home))
