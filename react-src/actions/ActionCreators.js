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
  RETRIEVING_WEB_MODULE,
  WEB_MODULE_RETRIEVED,
  SELECTED_WEB_MODULE_TO_EDIT,
  UPDATING_WEB_MODULE,
  WEB_MODULE_UPDATED,
  SET_WEB_MODULE_TO_DELETE,
  // Companies
  SAVING_COMPANY_DATA_TO_DB,
  COMPANY_DATA_SAVED,
  COMPANY_DATA_ERROR,
  GETTING_COMPANIES,
  SET_COMPANIES,
  SET_COMPANY_TO_DELETE,
  DELETING_COMPANY,
  COMPANY_DELETED,
  RETRIEVING_COMPANY,
  COMPANY_RETRIEVED,
  SELECTED_COMPANY_TO_EDIT,
  UPDATING_COMPANY,
  COMPANY_UPDATED,
  SET_COMPANY_TO_EDIT,
  // Divisions
  GETTING_DIVISIONS,
  SET_DIVISIONS,
  // Industries
  GETTING_INDUSTRIES,
  SET_INDUSTRIES,
  // Segments
  GETTING_SEGMENTS,
  SET_SEGMENTS,
  // Tours
  SAVING_TOUR,
  TOUR_SAVED,
  GETTING_TOURS,
  SET_TOURS,
  DELETING_TOUR,
  TOUR_DELETED,
  SET_TOUR_TO_DELETE,
  RETRIEVING_TOUR,
  TOUR_RETRIEVED,
  SELECTED_TOUR_TO_EDIT,
  UPDATING_TOUR,
  TOUR_UPDATED,
  SET_TOUR_TO_EDIT,
  // Custom Module
  SAVING_CUSTOM_MODULE,
  CUSTOM_MODULE_SAVED,
  GETTING_CUSTOM_MODULES,
  RETRIEVING_CUSTOM_MODULE,
  DELETING_CUSTOM_MODULE,
  CUSTOM_MODULE_DELETED,
  SET_CUSTOM_MODULE_TO_DELETE,
  SELECTED_CUSTOM_MODULE_TO_EDIT,
  UPDATING_CUSTOM_MODULE,
  CUSTOM_MODULE_UPDATED,
  SET_CUSTOM_MODULES,
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
const saveWebModule = (browser_url, callback) => {
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
        if (callback) callback()
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
    axios.delete(`/webmodules/delete/${id}`)
      .then(data => {
        dispatch({ type: DELETING_WEB_MODULE, payload: false })
        if (data.data.success) {
          dispatch({ type: WEB_MODULE_DELETED, payload: true })
          if (callback) callback()
          window.webModuleDeletedTimer = setTimeout(() => {
            dispatch({ type: WEB_MODULE_DELETED, payload: false })
          }, 2000)
        }
        console.log(data.data)
      })
      .catch(err => console.log(err))
  }
}
const updateWebModule = ({ id, browser_url }, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATING_WEB_MODULE, payload: true })
    axios.put(`/webmodules/update/${id}`, { browser_url })
      .then(data => {
        dispatch({ type: UPDATING_WEB_MODULE, payload: false })
        dispatch({ type: WEB_MODULE_UPDATED, payload: true })
        if (callback) callback()
        window.webmoduleUpdateTimer = setTimeout(() => dispatch({ type: WEB_MODULE_UPDATED, payload: false }))
      })
      .catch(err => console.log(err))
  }
}
const getOneWebModule = (id, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: RETRIEVING_WEB_MODULE, payload: true })
    axios.post(`/webmodules/${id}`)
      .then(data => {
        dispatch({ type: RETRIEVING_WEB_MODULE, payload: false })
        dispatch({ type: WEB_MODULE_RETRIEVED, payload: true })
        if (data.data.success) dispatch({ type: SELECTED_WEB_MODULE_TO_EDIT, payload: data.data.success })
        else console.log(`error: ${data.data.error}`)
        if (callback) callback()
        window.webmoduleRetrievalTimer = setTimeout(() => {
          dispatch({ type: WEB_MODULE_RETRIEVED, payload: false })
        }, 2000)
        console.log(data.data)
      })
      .catch(err => console.log(err))
  }
}
const setWebModuleToDelete = (id) => ({ type: SET_WEB_MODULE_TO_DELETE, payload: id })
const setWebModuleToEdit = (webmodule) => ({ type: SELECTED_WEB_MODULE_TO_EDIT, payload: webmodule })
// Company
const getCompanies = (cb) => {
  return (dispatch, getState) => {
    dispatch({ type: GETTING_COMPANIES, payload: true })
    axios.post('/companies/view')
      .then(data => {
        dispatch({ type: GETTING_COMPANIES, payload: false })
        console.log(data.data)
        if (data.data.success) dispatch({ type: SET_COMPANIES, payload: data.data.success })
        else console.log(`error: ${data.data.error}`)
        if (cb) cb()
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
        if (data.data.success) {
          dispatch({ type: COMPANY_DELETED, payload: true })
          if (callback) callback()
          window.companyDeletedTimer = setTimeout(() => {
            dispatch({ type: COMPANY_DELETED, payload: false })
          }, 2000)
        }
        console.log(data.data)
      })
      .catch(err => console.log(err))
  }
}
const submitCreateCompanyData = ({ name, logo, customer_names, notes }, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: SAVING_COMPANY_DATA_TO_DB, payload: true })
    axios.post(`/companies`, { name, logo, customer_names, notes })
      .then(data => {
        dispatch({ type: SAVING_COMPANY_DATA_TO_DB, payload: false })
        if (data.data.success) {
          if (callback) callback()
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
const updateCompanyData = ({ id, name, logo, customer_names, notes }, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATING_COMPANY, payload: true })
    axios.put(`/companies/update/${id}`, { name, logo, customer_names, notes })
      .then(data => {
        dispatch({ type: UPDATING_COMPANY, payload: false })
        dispatch({ type: COMPANY_UPDATED, payload: true })
        if (callback) callback()
        window.companyUpdateTimer = setTimeout(() => dispatch({ type: COMPANY_UPDATED, payload: false }))
      })
      .catch(err => console.log(err))
  }
}
const getOneCompany = (id, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: RETRIEVING_COMPANY, payload: true })
    axios.post(`/companies/${id}`)
      .then(data => {
        dispatch({ type: RETRIEVING_COMPANY, payload: false })
        dispatch({ type: COMPANY_RETRIEVED, payload: true })
        if (data.data.success) dispatch({ type: SELECTED_COMPANY_TO_EDIT, payload: data.data.success })
        else console.log(`error: ${data.data.error}`)
        if (callback) callback()
        window.companyRetrievalTimer = setTimeout(() => {
          dispatch({ type: COMPANY_RETRIEVED, payload: false })
        }, 2000)
        console.log(data.data)
      })
      .catch(err => console.log(err))
  }
}
const setCompanyToDelete = (id) => ({ type: SET_COMPANY_TO_DELETE, payload: id })
const setCompanyToEdit = (company) => ({ type: SELECTED_COMPANY_TO_EDIT, payload: company })

// Divisions
const getDivisions = (cb) => {
  return (dispatch, getState) => {
    dispatch({ type: GETTING_DIVISIONS, payload: true })
    axios.post(`/divisions/view`)
      .then(data => {
        dispatch({ type: GETTING_DIVISIONS, payload: false })
        console.log(data)
        if (data.data.success) dispatch({ type: SET_DIVISIONS, payload: data.data.success })
        else console.log(`error: ${data.data.error}`)
        if (cb) cb()
      })
      .catch(err => console.log(err))
  }
}
// Industries
const getIndustries = (cb) => {
  return (dispatch, getState) => {
    dispatch({ type: GETTING_INDUSTRIES, payload: true })
    axios.post(`/industries/view`)
      .then(data => {
        dispatch({ type: GETTING_INDUSTRIES, payload: false })
        console.log(data)
        if (data.data.success) dispatch({ type: SET_INDUSTRIES, payload: data.data.success })
        else console.log(`error: ${data.data.error}`)
        if (cb) cb()
      })
      .catch(err => console.log(err))
  }
}
// Segments
const getSegments = (cb) => {
  return (dispatch, getState) => {
    dispatch({ type: GETTING_SEGMENTS, payload: true })
    axios.post(`/segments/view`)
      .then(data => {
        dispatch({ type: GETTING_SEGMENTS, payload: false })
        console.log(data)
        if (data.data.success) dispatch({ type: SET_SEGMENTS, payload: data.data.success })
        else console.log(`error: ${data.data.error}`)
        if (cb) cb()
      })
      .catch(err => console.log(err))
  }
}
// Tour Modules
const createTourModule = ({
    tourName, company_id, division_id, industry_id, segment_id,
    company_name, division_name, industry_name, segment_name
  }, cb) => {
  return (dispatch, getState) => {
    dispatch({ type: GETTING_TOURS, payload: true })
    // console.log(tourName, company_id, division_id, industry_id, segment_id)
    axios.post(`/tourmodules`, {
        name: tourName,
        company_id, division_id, industry_id, segment_id,
        company_name, division_name, industry_name, segment_name
      })
      .then(data => {
        dispatch({ type: GETTING_TOURS, payload: false })
        console.log(data)
        if (data.data.success) dispatch({ type: SET_TOURS, payload: data.data.success })
        else console.log(`error: ${data.data.error}`)
        if (cb) cb()
      })
      .catch(err => console.log(err))
  }
}
const getTours = (cb) => {
  return (dispatch, getState) => {
    dispatch({ type: GETTING_TOURS, payload: true })
    axios.post('/tourmodules/view')
      .then(data => {
        dispatch({ type: GETTING_TOURS, payload: false })
        console.log(data.data)
        if (data.data.success) dispatch({ type: SET_TOURS, payload: data.data.success })
        else console.log(`error: ${data.data.error}`)
        if (cb) cb()
      })
      .catch(err => console.log(err))
  }
}
const deleteTour = (id, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETING_TOUR, payload: true })
    axios.delete(`/tourmodules/delete/${id}`)
      .then(data => {
        dispatch({ type: DELETING_TOUR, payload: false })
        if (data.data.success) {
          dispatch({ type: TOUR_DELETED, payload: true })
          if (callback) callback()
          window.tourDeletedTimer = setTimeout(() => {
            dispatch({ type: TOUR_DELETED, payload: false })
          }, 2000)
        }
        console.log(data.data)
      })
      .catch(err => console.log(err))
  }
}
const getOneTour = (id, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: RETRIEVING_TOUR, payload: true })
    axios.post(`/tourmodules/${id}`)
      .then(data => {
        dispatch({ type: RETRIEVING_TOUR, payload: false })
        dispatch({ type: TOUR_RETRIEVED, payload: true })
        if (data.data.success) dispatch({ type: SELECTED_TOUR_TO_EDIT, payload: data.data.success })
        else console.log(`error: ${data.data.error}`)
        if (callback) callback()
        window.tourRetrievalTimer = setTimeout(() => {
          dispatch({ type: TOUR_RETRIEVED, payload: false })
        }, 2000)
        console.log(data.data)
      })
      .catch(err => console.log(err))
  }
}
const updateTourModule = ({
  tour_id, tourName,
  company_id, division_id, industry_id, segment_id,
  company_name, division_name, industry_name, segment_name,
  }, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATING_TOUR, payload: true })
    axios.put(`/tourmodules/update/${tour_id}`, {
        name: tourName,
        company_id, division_id, industry_id, segment_id,
        company_name, division_name, industry_name, segment_name,
      })
      .then(data => {
        dispatch({ type: UPDATING_TOUR, payload: false })
        dispatch({ type: TOUR_UPDATED, payload: true })
        if (callback) callback()
        window.tourUpdateTimer = setTimeout(() => dispatch({ type: TOUR_UPDATED, payload: false }), 2000)
      })
      .catch(err => console.log(err))
  }
}
const setTourToDelete = (id) => ({ type: SET_TOUR_TO_DELETE, payload: id })
const setTourToEdit = (tour) => ({ type: SELECTED_TOUR_TO_EDIT, payload: tour })
// Custom Module
const saveCustomModule = ({ name, image_url }, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: SAVING_CUSTOM_MODULE, payload: true })
    axios.post(`/custommodules`, { name, image_url })
      .then(data => {
        if (data.data.success) {
          dispatch({ type: SAVING_CUSTOM_MODULE, payload: false })
          dispatch({ type: CUSTOM_MODULE_SAVED, payload: true })
          window.customModuleSavedTimer = setTimeout(() => dispatch({ type: CUSTOM_MODULE_SAVED, payload: false }), 2000)
          if (callback) callback()
        } else {
          console.log(data.data.error)
        }
      })
      .catch(err => console.log(err))
  }
}
const getCustomModules = (callback) => {
  return (dispatch, getState) => {
    dispatch({ type: GETTING_CUSTOM_MODULES, payload: true })
    axios.post(`/custommodules/view`)
      .then(data => {
        if (data.data.success) {
          dispatch({ type: GETTING_CUSTOM_MODULES, payload: false })
          dispatch({ type: SET_CUSTOM_MODULES, payload: data.data.success })
          if (callback) callback()
        } else {
          console.log(data.data.error)
          // dispatch({ type: GETTING_CUSTOM_MODULES_ERROR, payload: true })
          // window.gettingCustomModulesErrorTimer = setTimeout(() => dispatch({ type: GETTING_CUSTOM_MODULES_ERROR, payload: false }), 2000)
        }
      })
      .catch(err => console.log(err))
  }
}
const getOneCustomModule = (id, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: RETRIEVING_CUSTOM_MODULE, payload: true })
    axios.post(`/custommodules/${id}`)
      .then(data => {
        if (data.data.success) {
          dispatch({ type: RETRIEVING_CUSTOM_MODULE, payload: false })
          dispatch({ type: SELECTED_CUSTOM_MODULE_TO_EDIT, payload: data.data.success })
          if (callback) callback()
        } else {
          console.log(data.data.error)
        }
      })
  }
}
const deleteCustomModule = (id, callback) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETING_CUSTOM_MODULE, payload: true })
    axios.delete(`/custommodules/delete/${id}`)
      .then(data => {
        if (data.data.success) {
          dispatch({ type: DELETING_CUSTOM_MODULE, payload: false })
          dispatch({ type: CUSTOM_MODULE_DELETED, payload: true })
          window.customModuleDeletedTimer = setTimeout(() => {
            dispatch({ type: CUSTOM_MODULE_DELETED, payload: false })
          }, 2000)
          if (callback) callback()
        } else {
          console.log(data.data.error)
        }
      })
  }
}
const updateCustomModule = ({ id, name, image_url }, callback) => {
  return (dispatch, getState) => {
    console.log(id)
    dispatch({ type: UPDATING_CUSTOM_MODULE, payload: true })
    axios.put(`/custommodules/update/${id}`, { name, image_url })
      .then(data => {
        if (data.data.success) {
          dispatch({ type: UPDATING_CUSTOM_MODULE, payload: false })
          dispatch({ type: CUSTOM_MODULE_UPDATED, payload: true })
          window.customModuleUpdatingTimer = setTimeout(() => dispatch({ type: CUSTOM_MODULE_UPDATED, payload: false }), 2000)
          if (callback) callback()
        } else {
          console.log(data.data.error)
        }
      })
  }
}
const setCustomModuleToDelete = (id) => ({ type: SET_CUSTOM_MODULE_TO_DELETE, payload: id })
const setCustomModuleToEdit = (cmodule) => ({ type: SELECTED_CUSTOM_MODULE_TO_EDIT, payload: cmodule })

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
  setWebModuleToDelete,
  deleteWebModule,
  getOneWebModule,
  updateWebModule,
  setWebModuleToEdit,
  // Eco Lab - Company Data
  submitCreateCompanyData,
  getCompanies,
  setCompanyToDelete,
  deleteCompany,
  getOneCompany,
  updateCompanyData,
  setCompanyToEdit,
  // Eco Lab - Division, Industry, Segment Data
  getDivisions,
  getIndustries,
  getSegments,
  // Tours
  createTourModule,
  getTours,
  setTourToDelete,
  deleteTour,
  getOneTour,
  updateTourModule,
  setTourToEdit,
  // Eco Lab - Custom Module
  saveCustomModule,
  getCustomModules,
  getOneCustomModule,
  deleteCustomModule,
  updateCustomModule,
  setCustomModuleToEdit,
  setCustomModuleToDelete,

}
