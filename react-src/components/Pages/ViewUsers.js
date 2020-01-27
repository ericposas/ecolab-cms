import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'
import Toggler from '../UIcomponents/Toggler'
import TitleBar from '../UIcomponents/TitleBar'
import User from '../User'

class ViewUsers extends Component {

  state = {
    showAdminUsers: false,
    adminsButtonSelected: false,
    usersButtonSelected: true
  }

  componentDidMount() {
    const { checkAuth, setUserData, history } = this.props
    checkAuth(data => {
      const { auth, admin, name, email } = data.data
      if (admin == true) { this.getUsers(); setUserData(auth, admin, name, email); }
      else history.push('/')
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

  // toggleAdminView = () => {
  //   this.setState({
  //     ...this.state,
  //     showAdminUsers: !this.state.showAdminUsers
  //   })
  // }

  render() {
    const { UserData, Users } = this.props
    const { showDeletedMsg, usersButtonSelected, adminsButtonSelected } = this.state
    return (
      <>
        <TitleBar title={process.env.APP_NAME}/>
        <div className={'row'}>
          <div
            className={'col-2 left-side-panel'}
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
                  <div
                    onClick={() => {
                      this.setState({ ...this.state, usersButtonSelected: true, adminsButtonSelected: false })
                    }}
                    className={'left-side-panel-button'}>Users</div>
                  <div
                    onClick={() => {
                      this.setState({ ...this.state, usersButtonSelected: false, adminsButtonSelected: true })
                    }}
                    className={'left-side-panel-button'}>Admins</div>
                </>
            }
          </div>
          <div className='col-10'>
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
                  <div className={'user-bulk-actions-and-search-container row'}>
                    <select className='col-5'>
                      <option value=''>Bulk Actions</option>
                      <option value='Delete'>Delete Users</option>
                    </select>
                    <div style={{display:'inline-block'}}>Search: &nbsp;</div>
                    <input className='col-5' type='text'/>
                  </div>
                  <br/>
                  <br/>
                </>
              : null
            }
            {
              UserData.admin
              ? <>
                  <div className={'users-list-labels-container row'}>
                    <div className={'users-list-label-name col-5'}>Name</div>
                    <div className={'users-list-label-email col-5'}>Email</div>
                  </div>
                </>
              : null
            }
            {
              Users && UserData.admin && this.state.usersButtonSelected
              ?
                Users.map((user, idx) => (
                  <Fragment key={user._id}>
                    {
                      !user.admin
                      ? <User count={idx} user={user} deleteUser={() => this.deleteUser(user._id)}/>
                      : null
                    }
                  </Fragment>
                ))
              : null
            }
            {
              Users && UserData.admin && this.state.adminsButtonSelected
              ?
                Users.map((user, idx) => (
                  <Fragment key={user._id}>
                    {
                      user.admin
                      ? <User count={idx} user={user} deleteUser={() => this.deleteUser(user._id)}/>
                      : null
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

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(ViewUsers)))
