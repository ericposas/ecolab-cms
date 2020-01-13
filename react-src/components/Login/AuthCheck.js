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
        this.setState({ authResult: data.data.auth })
        if (data.data.auth == false) {
          setTimeout(() => {
            this.props.history.push('/login')
          }, 2000)
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        {this.state.authResult == false ? 'false' : 'true'}
      </>
    )
  }

}

export default AuthCheck
