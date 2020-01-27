import { combineReducers } from 'redux'
import UserData from './UserData'
import Users from './Users'
import BulkActionSelectedUsers from './BulkActionSelectedUsers'

const rootReducer = combineReducers({
  UserData,
  Users,
  BulkActionSelectedUsers
})

export default rootReducer
