import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import withAuthCheck from '../HOC/withAuthCheck'
import { mapState, mapDispatch } from '../../../mapStateMapDispatch'
import axios from 'axios'
import { XmlEntities as Entities } from 'html-entities'
import Toggler from '../UIcomponents/Toggler'
import TitleBar from '../UIcomponents/TitleBar'
import User from '../ListItems/User'
import Admin from '../ListItems/Admin'
import UserEditView from '../Modals/UserEditView'
import AdminEditView from '../Modals/AdminEditView'
import { toast, ToastContainer } from 'react-toastify'
import { Button, TextField, Input } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import CreateUser from '../Admin/CreateUser'
import CreateAdmin from '../Admin/CreateAdmin'
const entities = new Entities()

const minWidth = 640

class ViewUsers extends Component {

  state = {
    showAdminUsers: false,
    adminsButtonSelected: false,
    usersButtonSelected: true,
    bulkAction: null,
    searchFilter: '',
    sort: 'by-name-ascending',
    lastTypeSelected: 'USERS',
    displayCreateUserModal: false,
    displayCreateAdminModal: false
  }

  componentDidMount() {
    const { checkAuth, setAdminData, history, getUsers } = this.props
    checkAuth(data => {
      const { auth, owner, name, email } = data.data
      if (auth) {
        getUsers()
        setAdminData(auth, owner, name, email)
        window.addEventListener('resize', this.onResizeHandler)
        this.onResizeHandler()
      }
      else history.push('/admin')
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeHandler)
  }

  onResizeHandler = e => {
    this.setState({
      innerWidth: window.innerWidth
    })
    console.log(window.innerWidth)
  }

  deleteUser = async id => {
    const { getUsers } = this.props
    try {
      let data = await axios.delete(`/users/delete/${id}`)
      if (data.data.ok == 1) getUsers()
    } catch (err) {
      console.log(err)
    }
  }

  deleteAdmin = async id => {
    const { getAdmins } = this.props
    try {
      let data = await axios.delete(`/admins/delete/${id}`)
      if (data.data.ok == 1) getAdmins()
    } catch (err) {
      console.log(err)
    }
  }

  executeBulkActionUsers = async () => {
    const { BulkActionSelectedUsers, deselectUserForBulkAction } = this.props
    switch (this.state.bulkAction) {
      case 'DELETE':
        let selUsers = BulkActionSelectedUsers.length
        if (selUsers > 0) {
          toast.success(`User${ selUsers > 1 ? 's' : '' } deleted!`, { autoClose: 1000 })
          for (let i = 0; i < BulkActionSelectedUsers.length; i++) {
            await this.deleteUser(BulkActionSelectedUsers[i])
            deselectUserForBulkAction(BulkActionSelectedUsers[i])
          }
          console.log(BulkActionSelectedUsers.length + ' deleted.')
        } else {
          toast.warn('No user(s) selected for deletion', { autoClose: 2000 })
        }
        break;
      default:
        //
    }
  }

  executeBulkActionAdmins = async () => {
    const { BulkActionSelectedAdmins, deselectAdminForBulkAction } = this.props
    switch (this.state.bulkAction) {
      case 'DELETE':
        let selAdmins = BulkActionSelectedAdmins.length
        if (selAdmins > 0) {
          toast.success(`Admin${ selAdmins > 1 ? 's' : '' } deleted!`, { autoClose: 1000 })
          for (let i = 0; i < BulkActionSelectedAdmins.length; i++) {
            await this.deleteAdmin(BulkActionSelectedAdmins[i])
            deselectAdminForBulkAction(BulkActionSelectedAdmins[i])
          }
          console.log(BulkActionSelectedAdmins.length + ' deleted.')
        } else {
          toast.warn('No Admin(s) selected for deletion', { autoClose: 2000 })
        }
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

  renderTopButtons = () => (
    <div style={{ fontFamily: 'arial' }}>
      <div style={{ paddingBottom: '10px' }}>
        <Button
          style={{
            width: '100%',
            left: '8px',
            color: this.state.usersButtonSelected ? '#FFF' : '#000',
            backgroundColor: this.state.usersButtonSelected ? '#2b95ff' : '#D5D5D5'
          }}
          variant='contained'
          onClick={this.usersButtonClick}
          className={'left-side-panel-button panel-button-users'}>
          Users
        </Button>
      </div>
      {
        this.props.AdminData.owner == true
        ?
          <div>
            <Button
              style={{
                width: '100%',
                left: '8px',
                color: this.state.adminsButtonSelected ? '#FFF' : '#000',
                backgroundColor: this.state.adminsButtonSelected ? '#2b95ff' : '#D5D5D5'
              }}
              variant='contained'
              onClick={this.adminsButtonClick}
              className={'left-side-panel-button panel-button-admins'}>
              Admins
            </Button>
          </div>
        : null
      }
    </div>
  )

  renderTopButtonsAsStrips = () => (
    <>
      <div
        style={{ fontFamily: 'arial' }}
        onClick={this.usersButtonClick}
        className={'left-side-panel-button panel-button-users'}>
        Users
      </div>
      {
        this.props.AdminData.owner == true
        ?
          <div
            style={{ fontFamily: 'arial' }}
            onClick={this.adminsButtonClick}
            className={'left-side-panel-button panel-button-admins'}>
            Admins
          </div>
        : null
      }
    </>
  )

  handleAutoCompleteChange = (e, values) => {
    this.setState({
      bulkAction: (
        values ? values.value : ''
      )
    },
    () => console.log(this.state.bulkAction))
  }

  setDisplayCreateUserModal = val => {
    this.setState({
      displayCreateUserModal: val
    })
  }

  setDisplayCreateAdminModal = val => {
    this.setState({
      displayCreateAdminModal: val
    })
  }

  renderMain = () => (
    <>
      <div
        className={'user-bulk-actions-and-search-container row'}
        style={{
          fontFamily: 'arial'
        }}
        >
        <Autocomplete
          onChange={this.handleAutoCompleteChange}
          style={{ width: 200 }}
          options={
            [
              { type: `Delete`, value: `DELETE` }
            ]
          }
          getOptionLabel={option => option.type}
          renderInput={ params => (
            <TextField
              {...params}
              label='Select Action'
              variant='outlined'
              fullWidth
              />
          )}
          />
        <Button
          style={{
            minWidth: '70px',
            marginLeft: '4px',
            color: (
              this.state.bulkAction == 'DELETE'
              ? '#FFF'
              : '#000'
            ),
            backgroundColor: (
              this.state.bulkAction == 'DELETE'
              ? 'red'
              : '##EDEDED'
            )
          }}
          variant='contained'
          className={'col-2 user-bulk-action-dropdown'}
          onClick={this.state.usersButtonSelected ? this.executeBulkActionUsers : this.executeBulkActionAdmins}>
          {
            this.state.bulkAction
            ? this.state.bulkAction
            : 'No Action'
          }
        </Button>
        <div className='col-6'>
          <div className='padding-div-10'>
            <div className='user-search-box-label'>Search: &nbsp;</div>
            <Input
              type='text'
              value={this.state.searchFilter}
              onChange={this.setSearchFilter}/>
            <div className='x-symbol' onClick={this.clearSearchFilter}>&#10006;</div>
          </div>
        </div>
      </div>
      <br/>
      <div className={'row'}>
        <Button
          style={{
            color: '#fff',
            backgroundColor: '#000',
            padding: '10px',
            marginLeft: '4px'
          }}
          variant='contained'
          onClick={() => {
            if (this.state.usersButtonSelected) {
              this.setState({
                displayCreateUserModal: true,
                displayCreateAdminModal: false
              })
            }
            else {
              this.setState({
                displayCreateUserModal: false,
                displayCreateAdminModal: true
              })
            }
          }}>
          Create new {this.state.usersButtonSelected ? 'user' : 'admin'}
        </Button>
      </div>
      <br/>
      <div
        className={'users-list-labels-container row'}
        style={{ fontFamily: 'arial' }}
        >
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
      {
        this.props.Users && this.state.usersButtonSelected
        ?
          this.props.Users
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
              user.name.indexOf(this.state.searchFilter) > -1
              ?
                <Fragment key={user._id}>
                  <User count={idx} user={user}/>
                </Fragment>
              : null
            ))
        : null
      }
      {
        this.props.Admins && this.state.adminsButtonSelected
        ?
          this.props.Admins
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
              admin.name.indexOf(this.state.searchFilter) > -1
              ?
                <Fragment key={admin._id}>
                  <Admin count={idx} admin={admin}/>
                </Fragment>
              : null
            )
          )
        : null
      }
    </>
  )

  render() {
    return (
      <>
        <ToastContainer/>
        <TitleBar title={process.env.APP_NAME}/>
          {
            this.props.AdminData && this.props.AdminData.auth && this.state.innerWidth <= minWidth
            ?
              <div className='padding-div-10' style={{ marginLeft: '-14px' }}>
                {this.renderTopButtonsAsStrips()}
              </div>
            : null
          }
          {
            this.props.AdminData && this.props.AdminData.auth && this.state.innerWidth <= minWidth
            ?
              <div className='padding-div-20'>
                {this.renderMain()}
              </div>
            : null
          }
        <div className={'row'}>
          <div className={'col-2 left-side-panel'}>
            {
              this.props.AdminData && this.props.AdminData.auth && this.state.innerWidth > minWidth
              ? this.renderTopButtons()
              : null
            }
          </div>
          <div className='col-10'>
            {
              this.props.AdminData && this.props.AdminData.auth && this.state.innerWidth > minWidth
              ? this.renderMain()
              : null
            }
          </div>
        </div>
        {
          this.props.SelectedUserForEditing
          ? <UserEditView refreshUsersList={this.props.getUsers}/>
          : null
        }
        {
          this.props.SelectedAdminForEditing
          ? <AdminEditView refreshAdminsList={this.props.getAdmins}/>
          : null
        }
        {
          this.state.displayCreateUserModal
          ?
            <>
              <div className='fullscreen-darken' onClick={() => this.setDisplayCreateUserModal(false)}></div>
              <div className='center-float' style={{ width: '340px', height: '300px' }}>
                <CreateUser setDisplay={this.setDisplayCreateUserModal}/>
              </div>
            </>
          : null
        }
        {
          this.state.displayCreateAdminModal
          ?
            <>
              <div className='fullscreen-darken' onClick={() => this.setDisplayCreateAdminModal(false)}></div>
              <div className='center-float' style={{ width: '340px', height: '300px' }}>
                <CreateAdmin setDisplay={this.setDisplayCreateAdminModal}/>
              </div>
            </>
          : null
        }
      </>
    )
  }

}

export default connect(mapState, mapDispatch)(withAuthCheck(withRouter(ViewUsers)))
