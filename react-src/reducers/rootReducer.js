import { combineReducers } from 'redux'
import Users from './Users'
import Admins from './Admins'
import AdminData from './AdminData'
import AppUserData from './AppUserData'
import BulkActionSelectedUsers from './BulkActionSelectedUsers'
import BulkActionSelectedAdmins from './BulkActionSelectedAdmins'
import UserViewEditDisplay from './UserViewEditDisplay'
import SelectedUserForEditing from './SelectedUserForEditing'

const rootReducer = combineReducers({
  Users,
  Admins,
  AdminData,
  AppUserData,
  BulkActionSelectedUsers,
  BulkActionSelectedAdmins,
  // UserViewEditDisplay,
  SelectedUserForEditing
})

export default rootReducer
