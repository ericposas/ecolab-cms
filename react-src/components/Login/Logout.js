import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'

class Logout extends Component {

  componentDidMount() {
    this.logout()
  }

  logout = () => {
    const { history, setUserData } = this.props
    axios.post('/logout')
      .then(data => {
        setUserData(null, null, null, null)
        if (data.data == 'logged out') setTimeout(() => history.push('/'), 1000)
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

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(Logout)))
