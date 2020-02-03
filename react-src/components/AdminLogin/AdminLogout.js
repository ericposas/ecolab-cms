import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'

class AdminLogout extends Component {

  componentDidMount() {
    this.logout()
  }

  logout = () => {
    const { history, setAdminData, setAppUserData } = this.props
    axios.post('/logout')
      .then(data => {
        setAdminData(null, null, null, null, null)
        setAppUserData(null, null, null, null, null)
        if (data.data == 'logged out') {
          if (this.props.match.params.type == 'admin') setTimeout(() => history.push('/admin'), 1000)
          else setTimeout(() => history.push('/'), 1000)
        }
      })
      .catch(err => console.log(err))
  }
  
  render() {
    return (
      <>
        <div>You will be logged out</div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(AdminLogout)))
