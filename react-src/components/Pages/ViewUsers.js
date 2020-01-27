import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'
import Toggler from '../UIcomponents/Toggler'
import TitleBar from '../UIcomponents/TitleBar'
import User from '../User'
import Admin from '../Admin'

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
      if (auth) { this.getUsers(); setAdminData(auth, name, email); }
      else history.push('/')
    })
  }

  getUsers = () => {
    const { setUsers } = this.props
    axios.post('/users/all')
      .then(data => {
        setUsers(data.data)
      })
      .catch(err => console.log(err))
  }

  getAdmins = () => {
    const { setAdmins } = this.props
    axios.post('/admins/all')
      .then(data => setAdmins(data.data))
      .catch(err => console.log(err))
  }

  deleteUser = async id => {
    try {
      let data = await axios.delete(`/users/delete/${id}`)
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

  deleteAdmin = async id => {
    try {
      let data = await axios.delete(`/admins/delete/${id}`)
      if (data.data.ok == 1) {
        this.getAdmins()
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

  executeBulkActionUsers = async () => {
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

  executeBulkActionAdmins = async () => {
    const { BulkActionSelectedAdmins, deselectAdminForBulkAction } = this.props
    switch (this.state.bulkAction) {
      case 'DELETE':
        for (let i = 0; i < BulkActionSelectedAdmins.length; i++) {
          await this.deleteAdmin(BulkActionSelectedAdmins[i])
          deselectAdminForBulkAction(BulkActionSelectedAdmins[i])
        }
        console.log(BulkActionSelectedAdmins.length + ' deleted.')
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

  usersButtonClick = () => {
    this.setState({ ...this.state, usersButtonSelected: true, adminsButtonSelected: false })
    this.getUsers()
  }

  adminsButtonClick = () => {
    this.setState({ ...this.state, usersButtonSelected: false, adminsButtonSelected: true })
    this.getAdmins()
  }
  
  render() {
    const { AdminData, Users, Admins, history } = this.props
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
              ? <>
                  <div
                    onClick={this.usersButtonClick}
                    className={'left-side-panel-button'}>Users</div>
                  <div
                    onClick={this.adminsButtonClick}
                    className={'left-side-panel-button'}>Admins</div>
                </>
              : <div>You need to login as an admin user</div>
            }
          </div>
          <div className='col-10'>
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
                      <option value='DELETE'>Delete {this.state.usersButtonSelected ? ' Users' : ' Admins'}</option>
                    </select>
                    <button
                      className={'col-2 user-bulk-action-dropdown'}
                      onClick={this.state.usersButtonSelected ? this.executeBulkActionUsers : this.executeBulkActionAdmins}>
                      {this.state.bulkAction ? this.state.bulkAction : 'No Action'}
                    </button>
                    <div className='col-6'>
                      <div className='user-search-box'>Search: &nbsp;</div>
                      <input type='text'/>
                    </div>
                  </div>
                  <div className={'row'}>
                    <button onClick={() => history.push('/createUser')}>Create new user</button>
                  </div>
                  <br/>
                  <br/>
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
              Admins && this.state.adminsButtonSelected
              ?
                Admins.map((admin, idx) => (
                  <Fragment key={admin._id}>
                    <Admin count={idx} admin={admin}/>
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
