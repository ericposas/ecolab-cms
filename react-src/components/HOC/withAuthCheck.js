import React, { Component } from 'react'
import axios from 'axios'

const withAuthCheck = (ComponentWithAuthCheck) => {
  class CWAC extends Component {
    checkAuth = cb => {
      axios.post('/authCheck')
        .then(cb)
        .catch(err => console.log(err))
    }
    render() {
      return (
        <ComponentWithAuthCheck
          checkAuth={this.checkAuth}
          {...this.props}
        />
      )
    }
  }
  return CWAC
}

export default withAuthCheck
