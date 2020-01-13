import React, { Component } from 'react'
import axios from 'axios'

class AuthCheck extends Component {

  constructor(props) {
    super(props)
    this.state = {
      authResult: null
    }
  }

  componentDidMount() {
    this.checkAuth()
  }

  checkAuth = () => {
    axios.post('/authCheck')
      .then(data => {
        console.log(data)
        this.setState({ authResult: data.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        {this.state.authResult}
      </>
    )
  }

}

export default AuthCheck
