import { combineReducers } from 'redux'
import Users from './Users'
import Admins from './Admins'
import AdminData from './AdminData'
import BulkActionSelectedUsers from './BulkActionSelectedUsers'
import BulkActionSelectedAdmins from './BulkActionSelectedAdmins'
import UserViewEditDisplay from './UserViewEditDisplay'
import SelectedUserForEditing from './SelectedUserForEditing'

const rootReducer = combineReducers({
  Users,
  Admins,
  AdminData,
  BulkActionSelectedUsers,
  BulkActionSelectedAdmins,
  // UserViewEditDisplay,
  SelectedUserForEditing
})

export default rootReducer
