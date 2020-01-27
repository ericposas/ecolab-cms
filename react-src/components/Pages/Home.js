import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import TitleBar from '../UIcomponents/TitleBar'

class Home extends Component {

  componentDidMount() {
    const { checkAuth, setUserData, history } = this.props
    checkAuth(data => {
      const { auth, admin, name, email } = data.data
      if (auth) setUserData(auth, admin, name, email)
      else history.push('/login')
    })
  }

  render() {
    const { UserData } = this.props
    return (
      <>
        <TitleBar title={process.env.APP_NAME}/>
        <div>
          {
            UserData.auth
            ? <><div>Welcome {UserData.name}</div></>
            : null
          }
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(Home)))
