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
    const { checkAuth, setAdminData, history } = this.props
    checkAuth(data => {
      const { auth, owner, name, email } = data.data
      if (auth) setAdminData(auth, owner, name, email)
      else history.push('/')
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
    const { AdminData } = this.props
    return (
      <>
      {
        AdminData.auth
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
