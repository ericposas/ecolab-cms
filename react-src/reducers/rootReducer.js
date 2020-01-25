import { combineReducers } from 'redux'
import UserData from './UserData'
import Users from './Users'

const rootReducer = combineReducers({
  UserData,
  Users
})

export default rootReducer
