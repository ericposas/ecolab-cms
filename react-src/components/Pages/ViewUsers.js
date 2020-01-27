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
    usersButtonSelected: true,
    bulkAction: null
  }

  componentDidMount() {
    const { checkAuth, setAdminData, history } = this.props
    checkAuth(data => {
      const { auth, name, email } = data.data
      if (auth) { this.getUsers(); setUserData(auth, name, email); }
      else history.push('/')
    })
  }

  getUsers = () => {
    const { setUsers } = this.props
    axios.post('/users/all')
      .then(data => setUsers(data.data))
      .catch(err => console.log(err))
  }

  deleteUser = async id => {
    try {
      let data = await axios.delete(`/users/delete/${id}`)
      // .then(data => {
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
    } catch (err) {
      console.log(err)
    }
  }

  executeBulkAction = async () => {
    const { BulkActionSelectedUsers, deselectUserForBulkAction } = this.props
    switch (this.state.bulkAction) {
      case 'DELETE':
        for (let i = 0; i < BulkActionSelectedUsers.length; i++) {
          await this.deleteUser(BulkActionSelectedUsers[i])
          deselectUserForBulkAction(BulkActionSelectedUsers[i])
        }
        console.log(BulkActionSelectedUsers.length + ' deleted.')
        break;
      default:
        //
    }
  }

  // toggleAdminView = () => {
  //   this.setState({
  //     ...this.state,
  //     showAdminUsers: !this.state.showAdminUsers
  //   })
  // }

  render() {
    const { AdminData, Users } = this.props
    const { showDeletedMsg, usersButtonSelected, adminsButtonSelected } = this.state
    return (
      <>
        <TitleBar title={process.env.APP_NAME}/>
        <div className={'row'}>
          <div
            className={'col-2 left-side-panel'}
            style={{}}>
            {
              AdminData && AdminData.auth
              ? <div>You need to login as an admin user</div>
              : null
            }
            {
              !AdminData
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
              AdminData && AdminData.auth
              ? <>
                  <div className={'user-bulk-actions-and-search-container row'}>
                    <select
                      className='col-4'
                      onChange={e => {
                        this.setState({
                          ...this.state,
                          bulkAction: e.target.value
                        })
                      }}>
                      <option value=''>Bulk Actions</option>
                      <option value='DELETE'>Delete Users</option>
                    </select>
                    <button
                      className={'col-2 user-bulk-action-dropdown'}
                      onClick={this.executeBulkAction}>
                      {this.state.bulkAction ? this.state.bulkAction : 'No Action'}
                    </button>
                    <div className='col-6'>
                      <div className='user-search-box'>Search: &nbsp;</div>
                      <input type='text'/>
                    </div>
                  </div>
                  <br/>
                  <br/>
                </>
              : null
            }
            {
              AdminData && AdminData.auth
              ? <>
                  <div className={'users-list-labels-container row'}>
                    <div className={'users-list-label-name col-5'}>Name</div>
                    <div className={'users-list-label-email col-5'}>Email</div>
                  </div>
                </>
              : null
            }
            {
              Users && this.state.usersButtonSelected
              ?
                Users.map((user, idx) => (
                  <Fragment key={user._id}>
                    <User count={idx} user={user}/>
                  </Fragment>
                ))
              : null
            }
            {
              /*
              Admins && this.state.adminsButtonSelected
              ?
                Admins.map((user, idx) => (
                  <Fragment key={user._id}>
                    {
                      user.admin
                      ? <User count={idx} user={user} deleteUser={() => this.deleteUser(user._id)}/>
                      : null
                    }
                  </Fragment>
                ))
              : null
            */}
          </div>
        </div>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(ViewUsers)))
