import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'
import Toggler from '../UIcomponents/Toggler'
import TitleBar from '../UIcomponents/TitleBar'
import User from '../User'

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
        <TitleBar title={process.env.APP_NAME}/>
        <div className={'row'}>
          <div
            className={'col-4 left-side-panel'}
            style={{}}>
            {
              UserData.auth && !UserData.admin
              ? <div>You need to login as an admin user</div>
              : null
            }
            {
              !UserData.auth
              ? <div>Please login to continue</div>
              : <>
                  <div className={'left-side-panel-button'}>Users</div>
                  <div className={'left-side-panel-button'}>Admins</div>
                </>
            }
          </div>
          <div className='col-8'>
            {
              /*
              UserData.admin
              ?
                <>
                  <div>show admin users?</div>
                  <Toggler clickHandler={this.toggleAdminView} showAdminUsers={this.state.showAdminUsers}/>
                </>
              : null
              */
            }
            {
              showDeletedMsg
              ? <><div>User deleted.</div></>
              : null
            }
            {
              UserData.admin
              ? <>
                  <div className={'user-bulk-actions-and-search-container'}>
                    <select style={{ float: 'left' }}>
                      <option>Bulk Actions</option>
                    </select>
                    <input type='text' style={{ float: 'right' }}/>
                  </div>
                  <br/>
                  <br/>
                </>
              : null
            }
            {
              Users && UserData.admin
              ?
                Users.map((user, idx) => (
                  <Fragment key={user._id}>
                    {
                      user.admin
                      ? this.state.showAdminUsers
                        ? <User count={idx} user={user} deleteUser={() => this.deleteUser(user._id)}/>
                        : null
                      : <User count={idx} user={user} deleteUser={() => this.deleteUser(user._id)}/>
                    }
                  </Fragment>
                ))
              : null
            }
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(ViewUsers))
