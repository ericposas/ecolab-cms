import {
  CLEAR_SELECTED_USERS_FOR_BULK_ACTION,
  DESELECT_USER_FOR_BULK_ACTION,
  SELECT_USER_FOR_BULK_ACTION,
  CLEAR_SELECTED_ADMINS_FOR_BULK_ACTION,
  DESELECT_ADMIN_FOR_BULK_ACTION,
  SELECT_ADMIN_FOR_BULK_ACTION,
  SET_ADMIN_DATA,
  SET_ADMINS,
  SET_USERS,
  // SHOW_USER_EDIT_VIEW,
  // HIDE_USER_EDIT_VIEW,
  SET_SELECTED_USER_FOR_EDITING
} from '../constants/constants'

const setAdminData = (auth, name, email) => ({ type: SET_ADMIN_DATA, payload: { auth, name, email } })
const setAdmins = admins => ({ type: SET_ADMINS, payload: admins })
const setUsers = users => ({ type: SET_USERS, payload: users })
const selectUserForBulkAction = user => ({ type: SELECT_USER_FOR_BULK_ACTION, payload: user })
const deselectUserForBulkAction = user => ({ type: DESELECT_USER_FOR_BULK_ACTION, payload: user })
const clearUsersForBulkAction = () => ({ type: CLEAR_SELECTED_USERS_FOR_BULK_ACTION })
const selectAdminForBulkAction = admin => ({ type: SELECT_ADMIN_FOR_BULK_ACTION, payload: admin })
const deselectAdminForBulkAction = admin => ({ type: DESELECT_ADMIN_FOR_BULK_ACTION, payload: admin })
const clearAdminsForBulkAction = () => ({ type: CLEAR_SELECTED_ADMINS_FOR_BULK_ACTION })
// const showUserEditView = () => ({ type: SHOW_USER_EDIT_VIEW })
// const hideUserEditView = () => ({ type: HIDE_USER_EDIT_VIEW })
const setSelectedUserForEditing = user => ({ type: SET_SELECTED_USER_FOR_EDITING, payload: user })

export default {
  setUsers,
  setAdmins,
  setAdminData,
  deselectUserForBulkAction,
  selectUserForBulkAction,
  clearUsersForBulkAction,
  deselectAdminForBulkAction,
  selectAdminForBulkAction,
  clearAdminsForBulkAction,
  // showUserEditView,
  // hideUserEditView,
  setSelectedUserForEditing
}
