import { combineReducers } from 'redux'
import Users from './Users'
import AdminData from './AdminData'
import BulkActionSelectedUsers from './BulkActionSelectedUsers'

const rootReducer = combineReducers({
  Users,
  AdminData,
  BulkActionSelectedUsers
})

export default rootReducer
