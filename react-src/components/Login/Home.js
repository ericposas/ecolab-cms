import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.checkAuth()
  }

  checkAuth = () => {
    axios.post('/authCheck')
      .then(data => {
        console.log(data)
        if (data.data.auth == true) {
          this.setState({
            ...this.state,
            name: data.data.name,
            email: data.data.email,
            loggedIn: true
          })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <div>
          {
            this.state.loggedIn == true
            ? <><div>Welcome {this.state.name}</div></>
            : <><div>Home - mode:{process.env.MODE}</div></>
          }
        </div>
      </>
    )
  }

}

export default Home
