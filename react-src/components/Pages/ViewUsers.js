import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'

class ViewUsers extends Component {

  state = {}

  componentDidMount() {
    const { checkAuth, setAuthStatus, setAdminStatus, setUserData } = this.props
    checkAuth(data => {
      if (data.data.admin == true) {
        setAuthStatus(true)
        setAdminStatus(true)
        setUserData(data.data.name, data.data.email)
        this.getUsers()
      } else if (data.data.auth == true && data.data.admin == false) {
        setAuthStatus(true)
        setAdminStatus(false)
        setUserData(data.data.name, data.data.email)
      }
    })
  }

  getUsers = () => {
    const { setUsers } = this.props
    axios.post('/users/all')
      .then(data => {
        console.log(data.data)
        setUsers(data.data)
      })
      .catch(err => console.log(err))
  }

  deleteUser = id => {
    axios.delete(`/users/delete/${id}`)
      .then(data => {
        console.log(data)
        if (data.data.ok == 1) {
          this.getUsers()
          this.setState({
            ...this.state,
            showDeletedMsg: true
          })
          setTimeout(() => {
            this.setState({
              ...this.state,
              showDeletedMsg: false
            })
          }, 2000)
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { AuthStatus, IsAdmin, Users } = this.props
    const { showDeletedMsg } = this.state
    return (
      <>
        {
          showDeletedMsg
          ? <><div>User deleted.</div></>
          : null
        }
        {
          Users && IsAdmin
          ?
            Users.map(user => (
              <Fragment key={user._id}>
                <div>
                  <div
                    onClick={() => this.deleteUser(user._id)}
                    style={{
                      display:'inline-block',paddingRight:'10px',cursor:'pointer'
                    }}>&#10060;</div>
                    <div
                      style={{display:'inline-block'}}>
                      <div>{user.name}</div>
                      <div>{user.email}</div>
                    </div>
                  </div>
                  <br/>
              </Fragment>
          ))
          :
            AuthStatus == true && IsAdmin == false
            ? <div>You seem to be logged in, but you need admin priviledges to see this content</div>
            : <div>You need to login</div>
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(ViewUsers))
