import {
  // CMS
  CLEAR_SELECTED_USERS_FOR_BULK_ACTION,
  DESELECT_USER_FOR_BULK_ACTION,
  SELECT_USER_FOR_BULK_ACTION,
  CLEAR_SELECTED_ADMINS_FOR_BULK_ACTION,
  DESELECT_ADMIN_FOR_BULK_ACTION,
  SELECT_ADMIN_FOR_BULK_ACTION,
  SET_ADMIN_DATA,
  SET_APP_USER_DATA,
  SET_ADMINS,
  SET_USERS,
  SET_SELECTED_USER_FOR_EDITING,
  SET_SELECTED_ADMIN_FOR_EDITING,
  // ECO LAB APP
  SAVING_WEB_MODULE,
  WEB_MODULE_SAVED,
  GETTING_WEB_MODULES,
  SET_WEB_MODULES,

} from '../constants/constants'
import axios from 'axios'

// CMS - User management
const setAdminData = (auth, owner, name, email) => ({ type: SET_ADMIN_DATA, payload: { auth, owner, name, email } })
const setAppUserData = (auth, fullaccess, peer, name, email) => ({ type: SET_APP_USER_DATA, payload: { auth, fullaccess, peer, name, email } })
const getUsers = () => {
  // turning setUsers into a thunk, getUsers()
  return (dispatch, getState) => {
    axios.post('/users/all')
      .then(data => dispatch({ type: SET_USERS, payload: data.data }))
      .catch(err => console.log(err))
  }
}
const getAdmins = () => {
  return (dispatch, getState) => {
    axios.post('/admins/all')
      .then(data => dispatch({ type: SET_ADMINS, payload: data.data }))
      .catch(err => console.log(err))
  }
}
const selectUserForBulkAction = user => ({ type: SELECT_USER_FOR_BULK_ACTION, payload: user })
const deselectUserForBulkAction = user => ({ type: DESELECT_USER_FOR_BULK_ACTION, payload: user })
const clearUsersForBulkAction = () => ({ type: CLEAR_SELECTED_USERS_FOR_BULK_ACTION })
const selectAdminForBulkAction = admin => ({ type: SELECT_ADMIN_FOR_BULK_ACTION, payload: admin })
const deselectAdminForBulkAction = admin => ({ type: DESELECT_ADMIN_FOR_BULK_ACTION, payload: admin })
const clearAdminsForBulkAction = () => ({ type: CLEAR_SELECTED_ADMINS_FOR_BULK_ACTION })
const setSelectedUserForEditing = user => ({ type: SET_SELECTED_USER_FOR_EDITING, payload: user })
const setSelectedAdminForEditing = admin => ({ type: SET_SELECTED_ADMIN_FOR_EDITING, payload: admin })
// Eco Lab
const saveWebModule = (browser_url) => {
  return (dispatch, getState) => {
    dispatch({ type: SAVING_WEB_MODULE, payload: true })
    axios.post('/webmodules', { browser_url })
      .then(data => {
        console.log(data.data)
        dispatch({ type: SAVING_WEB_MODULE, payload: false })
        dispatch({ type: WEB_MODULE_SAVED, payload: true })
        window.webModuleSavedTimer = setTimeout(() => {
          dispatch({ type: WEB_MODULE_SAVED, payload: false })
        }, 2000)
      })
      .catch(err => console.log(err))
  }
}
const getWebModules = () => {
  return (dispatch, getState) => {
    dispatch({ type: GETTING_WEB_MODULES, payload: true })
    axios.post('/webmodules/view')
      .then(data => {
        dispatch({ type: GETTING_WEB_MODULES, payload: false })
        console.log(data.data)
        dispatch({ type: SET_WEB_MODULES, payload: data.data })

      })
      .catch(err => console.log(err))
  }
}

export default {
  // CMS - User mgmt
  getUsers,
  getAdmins,
  setAdminData,
  setAppUserData,
  deselectUserForBulkAction,
  selectUserForBulkAction,
  clearUsersForBulkAction,
  deselectAdminForBulkAction,
  selectAdminForBulkAction,
  clearAdminsForBulkAction,
  setSelectedUserForEditing,
  setSelectedAdminForEditing,
  // Eco Lab
  saveWebModule,
  getWebModules,

}
