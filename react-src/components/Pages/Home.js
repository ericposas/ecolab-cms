import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'

class Home extends Component {

  state = {
    loggedIn: false
  }

  componentDidMount() {
    this.props.checkAuth(data => {
      if (data.data.auth == true) {
        this.setState({
          ...this.state,
          sessionName: data.data.name,
          sessionEmail: data.data.email,
          loggedIn: true,
        })
      }
    })
  }

  render() {
    return (
      <>
        <div>
          {
            this.state.loggedIn == true
            ? <><div>Welcome {this.state.sessionName}</div></>
            : <><div>Home - mode:{process.env.MODE}</div></>
          }
        </div>
      </>
    )
  }

}

export default withAuthCheck(Home)
