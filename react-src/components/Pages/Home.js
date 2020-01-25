import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'

class Home extends Component {

  componentDidMount() {
    const { checkAuth, setUserData } = this.props
    checkAuth(data => {
      const { auth, admin, name, email } = data.data
      if (data.data.auth) {
        // setAuthStatus(data.data.auth)
        // setAdminStatus(data.data.admin)
        setUserData(auth, admin, name, email)
      }
    })
  }

  render() {
    const { UserData } = this.props
    return (
      <>
        <div>
          {
            UserData.auth && UserData.name
            ? <><div>Welcome {UserData.name}</div></>
            : <><div>Home - mode:{process.env.MODE}</div></>
          }
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(Home))
