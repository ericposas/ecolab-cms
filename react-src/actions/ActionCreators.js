import {
  CLEAR_SELECTED_USERS_FOR_BULK_ACTION,
  DESELECT_USER_FOR_BULK_ACTION,
  SELECT_USER_FOR_BULK_ACTION,
  ADMIN_DATA,
  SET_USERS
} from '../constants/constants'

const setAdminData = (auth, name, email) => ({ type: ADMIN_DATA, payload: { auth, name, email } })
const setUsers = users => ({ type: SET_USERS, payload: users })
const selectUserForBulkAction = user => ({ type: SELECT_USER_FOR_BULK_ACTION, payload: user })
const deselectUserForBulkAction = user => ({ type: DESELECT_USER_FOR_BULK_ACTION, payload: user })
const clearUsersForBulkAction = () => ({ type: CLEAR_SELECTED_USERS_FOR_BULK_ACTION })

export default {
  setUsers,
  setAdminData,
  deselectUserForBulkAction,
  selectUserForBulkAction,
}
