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
        this._timer = setTimeout(() => this.props.history.push('/admin'), 2000)
      }
    })
  }

  componentWillUnmount() {
    if (this._timer) clearTimeout(this._timer)
  }

  render() {
    return (
      <>{this.state.authResult == false ? 'false' : 'true'}</>
    )
  }

}

export default withAuthCheck(AuthCheck)
