import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import Toggler from '../UIcomponents/Toggler'
import axios from 'axios'

class ViewUsers extends Component {

  state = {
    showAdminUsers: false
  }

  componentDidMount() {
    const { checkAuth, setUserData } = this.props
    checkAuth(data => {
      const { auth, admin, name, email } = data.data
      setUserData(auth, admin, name, email)
      if (admin == true) this.getUsers()
    })
  }

  getUsers = () => {
    const { setUsers } = this.props
    axios.post('/users/all')
      .then(data => setUsers(data.data))
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

  toggleAdminView = () => {
    this.setState({
      ...this.state,
      showAdminUsers: !this.state.showAdminUsers
    })
  }

  render() {
    const { UserData, Users } = this.props
    const { showDeletedMsg } = this.state
    return (
      <>
        {
          UserData.admin
          ?
            <>
              <div>show admin users?</div>
              <Toggler clickHandler={this.toggleAdminView} showAdminUsers={this.state.showAdminUsers}/>
            </>
          : null
        }
        {
          showDeletedMsg
          ? <><div>User deleted.</div></>
          : null
        }
        {
          Users && UserData.admin
          ?
            Users.map(user => (
              <Fragment key={user._id}>
                {
                  user.admin
                  ?
                    this.state.showAdminUsers
                    ?
                      <>
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
                      </>
                    : null
                  :
                    <>
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
                    </>
                }
              </Fragment>
            ))
          :
            UserData.auth == true && UserData.admin == false
            ? <div>You seem to be logged in, but you need admin priviledges to see this content</div>
            : <div>You need to login</div>
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(ViewUsers))
