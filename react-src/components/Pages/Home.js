import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import TitleBar from '../UIcomponents/TitleBar'

class Home extends Component {

  componentDidMount() {
    const { checkAuth, setAdminData, history } = this.props
    checkAuth(data => {
      const { auth, name, email } = data.data
      if (auth) { setAdminData(auth, name, email); history.push('/users'); }
      else history.push('/login')
    })
  }

  render() {
    const { AdminData } = this.props
    return (
      <>
        <TitleBar title={process.env.APP_NAME}/>
        <div>
          {
            AdminData && AdminData.auth
            ? <><div>Welcome {AdminData.name}</div></>
            : null
          }
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(Home)))
