import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class SignUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nameValue: '',
      emailValue: '',
      passwordValue: '',
      showUserCreatedMsg: false
    }
  }

  componentDidMount() {
  }

  onNameInput = e => {
    this.setState({
      ...this.state,
      nameValue: e.target.value
    })
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

  submitForm = e => {
    e.preventDefault()
    axios.post('/signup', {
      name: this.state.nameValue,
      email: this.state.emailValue,
      password: this.state.passwordValue
    })
    .then(data => {
      if (data.data == 'success') {
        this.setState({
          ...this.state,
          showUserCreatedMsg: true
        })
        setTimeout(() => {
          this.setState({
            ...this.state,
            showUserCreatedMsg: false
          })
          this.props.history.push('/')
        }, 2000)
      }
      else console.log(data.data)
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        {
          this.state.showUserCreatedMsg
          ? <><div>User created succesfully.</div><br/><br/></>
          : null
        }
        <div>Sign up</div>
        <div>
          <form method='post'>
            <label>name: &nbsp;</label>
            <input onChange={this.onNameInput} type='text' value={this.state.nameValue}/><br/>
            <label>email: &nbsp;</label>
            <input onChange={this.onEmailInput} type='text' value={this.state.emailValue}/><br/>
            <label>password: &nbsp;</label>
            <input onChange={this.onPasswordInput} type='password' value={this.state.passwordValue}/><br/>
            <input onClick={this.submitForm} type='submit' value='log in'/>
          </form>
        </div>
      </>
    )
  }

}

export default withRouter(SignUp)
