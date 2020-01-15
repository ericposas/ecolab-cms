import React, { Component } from 'react'
import withAuthCheck from '../HOC/withAuthCheck'
import axios from 'axios'

class AuthCheck extends Component {

  state = {
    authResult: null
  }

  componentDidMount() {
    this.props.checkAuth(data => {
      this.setState({ authResult: data.data.auth })
      if (data.data.auth == false) {
        setTimeout(() => this.props.history.push('/login'), 2000)
      }
    })
  }

  render() {
    return (
      <>{this.state.authResult == false ? 'false' : 'true'}</>
    )
  }

}

export default withAuthCheck(AuthCheck)
