import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      emailValue: '',
      passwordValue: ''
    }
  }

  componentDidMount() {
  }

  onEmailInput = e => {
    this.setState({
      ...this.state,
      emailValue: e.target.value
    })
  }

  onPasswordInput = e => {
    this.setState({
      ...this.state,
      passwordValue: e.target.value
    })
  }

  logIn = e => {
    e.preventDefault()
    axios.post('/login', {
      email: this.state.emailValue,
      password: this.state.passwordValue
    })
    .then(data => {
      if (data.data == 'authorized') this.props.history.push('/authCheck')
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <div>log in</div>
        <div>
          <form method='post'>
            <label>email: &nbsp;</label>
            <input onChange={this.onEmailInput} type='text' value={this.state.emailValue}/><br/>
            <label>password: &nbsp;</label>
            <input onChange={this.onPasswordInput} type='password' value={this.state.passwordValue}/><br/>
            <input onClick={this.logIn} type='submit' value='log in'/>
          </form>
        </div>
      </>
    )
  }

}

export default withRouter(Login)
