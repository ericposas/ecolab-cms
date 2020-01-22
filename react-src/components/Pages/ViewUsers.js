import React, { Component, Fragment } from 'react'
import withAuthCheck from '../HOC/withAuthCheck'
import axios from 'axios'

class ViewUsers extends Component {

  state = {}

  componentDidMount() {
    this.props.checkAuth(data => {
      console.log(data.data)
      if (data.data.admin == true) {
        this.setState({
          ...this.state,
          auth: true,
          admin: true
        })
        this.getUsers()
      } else if (data.data.auth == true && data.data.admin == false) {
        this.setState({
          ...this.state,
          auth: true,
          admin: false
        })
      }
    })
  }

  getUsers = () => {
    axios.post('/users/view')
      .then(data => {
        console.log(data)
        this.setState({
          ...this.state,
          users: data.data
        })
      })
      .catch(err => console.log(err))
  }

  deleteUser = id => {
    axios.delete(`/users/delete/user/${id}`)
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
    return (
      <>
        {
          this.state.showDeletedMsg
          ? <><div>User deleted.</div></>
          : null
        }
        {
          this.state.users && this.state.admin == true
          ?
            this.state.users.map(user => (
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
            this.state.auth == true && this.state.admin == false
            ? <div>You seem to be logged in, but you need admin priviledges to see this content</div>
            : <div>You need to login</div>
        }
      </>
    )
  }

}

export default withAuthCheck(ViewUsers)
