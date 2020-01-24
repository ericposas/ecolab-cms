import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'

class AdminPasswordReset extends Component {

  state = {
    formState: 'default',
    emailVal: '',
  }

  componentDidMount() {
    const { checkAuth, IsAdmin, AuthStatus, setAuthStatus, setAdminStatus, setUserData, history } = this.props
    checkAuth(data => {
      if (data.data.auth) {
        setAuthStatus(data.data.auth)
        setAdminStatus(data.data.admin)
        setUserData(data.data.name, data.data.email)
        if (data.data.admin == false) {
          setTimeout(() => history.push('/'), 2000)
        }
      } else {
        history.push('/')
      }
    })
  }

  sendEmail = () => {
    axios.post('/password/forgot', { email: this.state.emailVal })
      .then(data => {
        console.log(data)
        if (data.data.success) {
          this.setState({
            ...this.state,
            formState: 'emailSentSuccess'
          })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { IsAdmin } = this.props
    return (
      <>
      {
        IsAdmin
        ?
          <>
          {
            this.state.formState == 'default'
            ?
              <>
                <form>
                  <input type='text' onChange={e => this.setState({ emailVal: e.target.value })} value={this.state.emailVal}/>
                </form>
                <button onClick={this.sendEmail}>send reset email</button>
              </>
            : null
          }
          {
            this.state.formState == 'emailSentSuccess'
            ?
             <>
              <div>Password reset email has been sent to {this.state.emailVal}</div>
             </>
            : null
          }
          </>
        :
          <>
            <div>Admin priviledges needed.</div>
          </>
      }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(AdminPasswordReset)))
