import { combineReducers } from 'redux'
import Users from './Users'
import Admins from './Admins'
import AdminData from './AdminData'
import BulkActionSelectedUsers from './BulkActionSelectedUsers'
import BulkActionSelectedAdmins from './BulkActionSelectedAdmins'

const rootReducer = combineReducers({
  Users,
  Admins,
  AdminData,
  BulkActionSelectedUsers,
  BulkActionSelectedAdmins,
})

export default rootReducer
