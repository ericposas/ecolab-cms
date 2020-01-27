import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'

class UserPasswordReset extends Component {

  state = {
    formState: 'default',
    codeVal: '',
    passwordVal: '',
    passwordVal2: ''
  }

  componentDidMount() {
  }

  submitCode = () => {
    axios.post('/password/code', { code: this.state.codeVal })
      .then(data => {
        console.log(data)
        if (data.data.success) {
          this.setState({
            ...this.state,
            formState: 'codeResetSuccess'
          })
        } else {
          console.log(data.data.error)
        }
      })
      .catch(err => console.log(err))
  }

  updatePassword = () => {
    const { passwordVal, passwordVal2 } = this.state
    if (passwordVal == passwordVal2) {
      this.setState({
        ...this.state,
        passwordsMatch: true
      })
      axios.post('/password/update', { password: passwordVal })
        .then(data => {
          if (data.data.success) {
            this.setState({
              ...this.state,
              formState: 'passwordResetSuccess'
            })
          }
        })
        .catch(err => console.log(err))
    } else {
      this.setState({
        ...this.state,
        passwordsMatch: false
      })
    }
  }
  
  render() {
    return (
      <>
        {
          this.state.formState == 'default'
          ?
            <>
              <form>
                <input type='text' onChange={e => this.setState({ codeVal: e.target.value })} value={this.state.codeVal}/>
              </form>
              <button onClick={this.submitCode}>submit reset code</button>
            </>
          : null
        }
        {
          this.state.formState == 'codeResetSuccess'
          ?
            <>
              {
                this.state.passwordsMatch == false
                ?
                  <>
                    <div>Passwords do not match</div>
                  </>
                : null
              }
              <form>
                <input type='password' onChange={e => this.setState({ passwordVal: e.target.value })} value={this.state.passwordVal}/>
                <input type='password' onChange={e => this.setState({ passwordVal2: e.target.value })} value={this.state.passwordVal2}/>
              </form>
              <button onClick={this.updatePassword}>update password</button>
            </>
          : null
        }
        {
          this.state.formState == 'passwordResetSuccess'
          ?
            <>
              <div>Password has been successfully set!</div>
            </>
          : null
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(UserPasswordReset)))
