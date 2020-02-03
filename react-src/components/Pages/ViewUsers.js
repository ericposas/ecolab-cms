import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
import axios from 'axios'
import { XmlEntities as Entities } from 'html-entities'
import Toggler from '../UIcomponents/Toggler'
import TitleBar from '../UIcomponents/TitleBar'
import User from '../ListItems/User'
import Admin from '../ListItems/Admin'
import UserEditView from '../Modals/UserEditView'
import AdminEditView from '../Modals/AdminEditView'
const entities = new Entities()

class ViewUsers extends Component {

  state = {
    showAdminUsers: false,
    adminsButtonSelected: false,
    usersButtonSelected: true,
    bulkAction: null,
    searchFilter: '',
    sort: 'by-name-ascending',
    lastTypeSelected: 'USERS'
  }

  componentDidMount() {
    const { checkAuth, setAdminData, history, getUsers } = this.props
    checkAuth(data => {
      const { auth, owner, name, email } = data.data
      if (auth) { getUsers(); setAdminData(auth, owner, name, email); }
      else history.push('/admin')
    })
  }

  componentWillUnmount() {
    if (this.deletedUserMsgTimer) clearTimeout(this.deletedUserMsgTimer)
    if (this.deletedAdminMsgTimer) clearTimeout(this.deletedAdminMsgTimer)
  }

  deleteUser = async id => {
    const { getUsers } = this.props
    try {
      let data = await axios.delete(`/users/delete/${id}`)
      if (data.data.ok == 1) {
        getUsers()
        this.setState({
          ...this.state,
          showDeletedMsg: true
        })
        this.deletedUserMsgTimer = setTimeout(() => {
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
    const { getAdmins } = this.props
    try {
      let data = await axios.delete(`/admins/delete/${id}`)
      if (data.data.ok == 1) {
        getAdmins()
        this.setState({
          ...this.state,
          showDeletedMsg: true
        })
        this.deletedAdminMsgTimer = setTimeout(() => {
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

  usersButtonClick = () => {
    const { getUsers } = this.props
    this.setState({
      ...this.state,
      usersButtonSelected: true,
      adminsButtonSelected: false,
      searchFilter: '',
    })
    getUsers()
  }

  adminsButtonClick = () => {
    const { getAdmins } = this.props
    this.setState({
      ...this.state,
      usersButtonSelected: false,
      adminsButtonSelected: true,
      searchFilter: '',
    })
    getAdmins()
  }

  setSearchFilter = e => this.setState({ ...this.state, searchFilter: e.target.value })

  clearSearchFilter = () => this.setState({ ...this.state, searchFilter: '' })

  sortByName = () => {
    this.setState({
      ...this.state,
      sort: this.state.sort == 'by-name-descending' ? 'by-name-ascending' : 'by-name-descending'
    })
  }

  sortByEmail = () => {
    this.setState({
      ...this.state,
      sort: this.state.sort == 'by-email-descending' ? 'by-email-ascending' : 'by-email-descending'
    })
  }

  sortAsc_Name = (a, b) => {
    if (a.name > b.name) return 1
    if (a.name < b.name) return -1
    return 0
  }

  sortDesc_Name = (a, b) => {
    if (a.name > b.name) return -1
    if (a.name < b.name) return 1
    return 0
  }

  sortAsc_Email = (a, b) => {
    if (a.email > b.email) return 1
    if (a.email < b.email) return -1
    return 0
  }

  sortDesc_Email = (a, b) => {
    if (a.email > b.email) return -1
    if (a.email < b.email) return 1
    return 0
  }

  logout = () => {
    this.props.history.push('/logout/admin')
  }

  render() {
    const { AdminData, Users, Admins, history, getUsers, getAdmins, BulkActionSelectedUsers, BulkActionSelectedAdmins } = this.props
    const { showDeletedMsg, usersButtonSelected, adminsButtonSelected, searchFilter } = this.state
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
              ? <>
                  <div>
                    {
                      usersButtonSelected
                      ? 'selected users deleted.'
                      :
                        adminsButtonSelected
                        ? 'selected Admins deleted.'
                        : null
                    }
                  </div>
                </>
              : null
            }
            {/*
              showDeletedMsg
              ? <>
                  <div>
                  {
                    this.state.lastTypeSelected == 'USERS'
                    ? BulkActionSelectedUsers.map(user_id => (
                        <Fragment key={user_id}>
                          <div>{user_id},</div>
                        </Fragment>
                      ))
                    : BulkActionSelectedAdmins.map(admin_id => (
                        <Fragment key={admin_id}>
                          <div>{admin_id},</div>
                        </Fragment>
                      ))
                  } deleted.
                  </div></>
              : null
            */}
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
                      <input
                        type='text'
                        value={searchFilter}
                        onChange={this.setSearchFilter}/>
                      <div className='x-symbol' onClick={this.clearSearchFilter}>&#10006;</div>
                    </div>
                  </div>
                  <br/>
                  <div className={'row'}>
                    <button
                      style={{ padding: '10px' }}
                      onClick={() => {
                        this.state.usersButtonSelected
                        ? history.push('/create-user')
                        : history.push('/create-admin')
                      }}>Create new {this.state.usersButtonSelected ? 'user' : 'admin'}</button>
                  </div>
                  <br/>
                  <div className={'users-list-labels-container row'}>
                    <div
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                      className={'users-list-label-name col-5'}
                      onClick={this.sortByName}>
                      Name<span>{
                        this.state.sort.indexOf('name') > -1
                        ? this.state.sort.indexOf('descending') > -1 ? entities.decode('&#8593;') : entities.decode('&#8595;')
                        : null
                      }</span>
                    </div>
                    <div
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                      className={'users-list-label-email col-5'}
                      onClick={this.sortByEmail}>
                      Email<span>{
                        this.state.sort.indexOf('email') > -1
                        ? this.state.sort.indexOf('descending') > -1 ? entities.decode('&#8593;') : entities.decode('&#8595;')
                        : null
                      }</span>
                    </div>
                  </div>
                </>
              : null
            }
            {
              Users && this.state.usersButtonSelected
              ?
                Users
                  .sort((a, b) => (
                    this.state.sort.indexOf('descending') > -1
                    ?
                      this.state.sort.indexOf('name') > -1
                      ? this.sortDesc_Name(a, b)
                      : this.sortDesc_Email(a, b)
                    :
                      this.state.sort.indexOf('name') > -1
                      ? this.sortAsc_Name(a, b)
                      : this.sortAsc_Email(a, b)
                  ))
                  .map((user, idx) => (
                    user.name.indexOf(searchFilter) > -1
                    ?
                      <Fragment key={user._id}>
                        <User count={idx} user={user}/>
                      </Fragment>
                    : null
                  ))
              : null
            }
            {
              Admins && this.state.adminsButtonSelected
              ?
                Admins
                  .sort((a, b) => (
                    this.state.sort.indexOf('descending') > -1
                    ?
                      this.state.sort.indexOf('name') > -1
                      ? this.sortDesc_Name(a, b)
                      : this.sortDesc_Email(a, b)
                    :
                      this.state.sort.indexOf('name') > -1
                      ? this.sortAsc_Name(a, b)
                      : this.sortAsc_Email(a, b)
                  ))
                  .map((admin, idx) =>
                  (
                    admin.name.indexOf(searchFilter) > -1
                    ?
                      <Fragment key={admin._id}>
                        <Admin count={idx} admin={admin}/>
                      </Fragment>
                    : null
                  )
                )
              : null
            }
          </div>
        </div>
        {
          this.props.SelectedUserForEditing
          ? <UserEditView refreshUsersList={getUsers}/>
          : null
        }
        {
          this.props.SelectedAdminForEditing
          ? <AdminEditView refreshAdminsList={getAdmins}/>
          : null
        }
        <button
          style={{
            top: '10px', right: '10px',
            position: 'absolute'
          }}
          onClick={this.logout}>log out</button>
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(ViewUsers)))
