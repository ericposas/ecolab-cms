import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../mapStateMapDispatch'
// import alphaSort from 'alpha-sort'
import axios from 'axios'
import { XmlEntities as Entities } from 'html-entities'
import Toggler from '../UIcomponents/Toggler'
import TitleBar from '../UIcomponents/TitleBar'
import User from '../ListItems/User'
import Admin from '../ListItems/Admin'
import UserEditView from '../Modals/UserEditView'
const entities = new Entities()

class ViewUsers extends Component {

  state = {
    showAdminUsers: false,
    adminsButtonSelected: false,
    usersButtonSelected: true,
    bulkAction: null,
    searchFilter: '',
    sort: 'by-name-ascending'
  }

  componentDidMount() {
    const { checkAuth, setAdminData, history } = this.props
    checkAuth(data => {
      const { auth, name, email } = data.data
      if (auth) { this.getUsers(); setAdminData(auth, name, email); }
      else history.push('/admin')
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
        }, 1000)
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
        }, 1000)
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
    this.setState({
      ...this.state,
      usersButtonSelected: true,
      adminsButtonSelected: false,
      searchFilter: ''
    })
    this.getUsers()
  }

  adminsButtonClick = () => {
    this.setState({
      ...this.state,
      usersButtonSelected: false,
      adminsButtonSelected: true,
      searchFilter: ''
    })
    this.getAdmins()
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

  // getSortFunction = () => {
  //   if (this.state.sort.indexOf('descending') > -1) return alphaSort.descending
  //   else return alphaSort.ascending
  // }

  logout = () => {
    this.props.history.push('/logout/admin')
  }

  render() {
    const { AdminData, Users, Admins, history } = this.props
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
                      onClick={() => history.push('/create-user')}>Create new user</button>
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
          ? <UserEditView refreshUsersList={this.getUsers}/>
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
