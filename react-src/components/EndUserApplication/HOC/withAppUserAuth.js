import React, { Component } from 'react'
import axios from 'axios'

const withAppUserAuth = (ComponentWithAppUserAuth) => {

  class CWAUA extends Component {

    checkAppUserAuth = cb => {
      axios.post('/users/sessioncheck')
        .then(cb)
        .catch(err => console.log(err))
    }
    
    render() {
      return (
        <ComponentWithAppUserAuth
          checkAppUserAuth={this.checkAppUserAuth}
          {...this.props}
        />
      )
    }

  }

  return CWAUA

}

export default withAppUserAuth
