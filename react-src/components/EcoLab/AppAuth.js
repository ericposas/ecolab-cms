import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'

class AppAuth extends Component {

  state = {
    email: '',
    password: ''
  }

  onEmailInput = e => {
    this.setState({
      ...this.state,
      email: e.target.value
    })
  }

  onPasswordInput = e => {
    this.setState({
      ...this.state,
      password: e.target.value
    })
  }

  onFormSubmit = e => {
    e.preventDefault()
    axios.post('/users/appauth', { email: this.state.email, password: this.state.password })
      .then(data => {
        console.log(data)

      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <div className='padding-div-10'>
          <form>
            <input type='text' onChange={this.onEmailInput} value={this.state.email}/>
            <input type='password' onChange={this.onPasswordInput} value={this.state.password}/>
          </form>
          <button onClick={this.onFormSubmit}>submit</button>
        </div>
      </>
    )
  }

}

export default AppAuth
