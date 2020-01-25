import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'

class ViewUsers extends Component {

  state = {}

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
      .then(data => {
        // console.log(data.data)
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
    const { UserData, Users } = this.props
    const { showDeletedMsg } = this.state
    return (
      <>
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
            UserData.auth == true && UserData.admin == false
            ? <div>You seem to be logged in, but you need admin priviledges to see this content</div>
            : <div>You need to login</div>
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(ViewUsers))
