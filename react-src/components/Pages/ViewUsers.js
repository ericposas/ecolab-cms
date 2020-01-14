import React, { Component, Fragment } from 'react'
import axios from 'axios'

class ViewUsers extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getUsers()
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
          this.state.users &&
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
        }
      </>
    )
  }

}

export default ViewUsers
