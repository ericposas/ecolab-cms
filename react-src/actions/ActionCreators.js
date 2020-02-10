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
  // Web Modules
  SAVING_WEB_MODULE,
  WEB_MODULE_SAVED,
  GETTING_WEB_MODULES,
  SET_WEB_MODULES,
  DELETING_WEB_MODULE,
  WEB_MODULE_DELETED,
  // Companies
  SAVING_COMPANY_DATA_TO_DB,
  COMPANY_DATA_SAVED,
  COMPANY_DATA_ERROR,
  GETTING_COMPANIES,
  SET_COMPANIES,
  SET_COMPANY_TO_DELETE,
  DELETING_COMPANY,
  COMPANY_DELETED,
  // Divisions
  GETTING_DIVISIONS,
  SET_DIVISIONS,

  //

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
// Web Module
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
const deleteWebModule = (id, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETING_WEB_MODULE, payload: true })
    axios.delete(`/companies/delete/${id}`)
      .then(data => {
        dispatch({ type: DELETING_WEB_MODULE, payload: false })
        dispatch({ type: WEB_MODULE_DELETED, payload: true })
        if (callback) callback()
        window.webModuleDeletedTimer = setTimeout(() => {
          dispatch({ type: WEB_MODULE_DELETED, payload: false })
        }, 2000)
        console.log(data.data)
      })
      .catch(err => console.log(err))
  }
}
// Company
const getCompanies = () => {
  return (dispatch, getState) => {
    dispatch({ type: GETTING_COMPANIES, payload: true })
    axios.post('/companies/view')
      .then(data => {
        dispatch({ type: GETTING_COMPANIES, payload: false })
        console.log(data.data)
        if (data.data.success) {
          dispatch({ type: SET_COMPANIES, payload: data.data.success })
        }
      })
      .catch(err => console.log(err))
  }
}
const deleteCompany = (id, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETING_COMPANY, payload: true })
    axios.delete(`/companies/delete/${id}`)
      .then(data => {
        dispatch({ type: DELETING_COMPANY, payload: false })
        dispatch({ type: COMPANY_DELETED, payload: true })
        if (callback) callback()
        window.companyDeletedTimer = setTimeout(() => {
          dispatch({ type: COMPANY_DELETED, payload: false })
        }, 2000)
        console.log(data.data)
      })
      .catch(err => console.log(err))
  }
}
const submitCreateCompanyData = (companyName, companyLogoFilePath, customerNameFields, noteFieldValue) => {
  return (dispatch, getState) => {
    dispatch({ type: SAVING_COMPANY_DATA_TO_DB, payload: true })
    axios.post(`/companies`, {
        name: companyName, logo: companyLogoFilePath,
        customer_names: customerNameFields, notes: noteFieldValue
      })
      .then(data => {
        dispatch({ type: SAVING_COMPANY_DATA_TO_DB, payload: false })
        if (data.data.success) {
          dispatch({ type: COMPANY_DATA_SAVED, payload: true })
          window.customerDataSavedTimer = setTimeout(() => {
            dispatch({ type: COMPANY_DATA_SAVED, payload: false })
          })
        } else {
          dispatch({ type: COMPANY_DATA_ERROR, payload: true })
          window.customerDataErrorTimer = setTimeout(() => {
            dispatch({ type: COMPANY_DATA_ERROR, payload: false })
          })
        }
        console.log(data.data)
      })
      .catch(err => console.log(err))
  }
}
const setCompanyToDelete = (id) => ({ type: SET_COMPANY_TO_DELETE, payload: id })
// Divisions
const getDivisions = () => {
  return (dispatch, getState) => {
    dispatch({ type: GETTING_DIVISIONS, payload: true })
    axios.post(`/divisions/view`)
      .then(data => {
        dispatch({ type: GETTING_DIVISIONS, payload: false })
        console.log(data)
        dispatch({ type: SET_DIVISIONS, payload: data.data.success })
      })
      .catch(err => console.log(err))
  }
}
// const setDivisions = ()

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
  // Eco Lab - Web Module Data
  saveWebModule,
  getWebModules,
  deleteWebModule,
  // Eco Lab - Company Data
  submitCreateCompanyData,
  getCompanies,
  deleteCompany,
  setCompanyToDelete,
  // Eco Lab - Division Data
  getDivisions,

}
