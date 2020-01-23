import { combineReducers } from 'redux'
import IsAdmin from './IsAdmin'
import AuthStatus from './AuthStatus'
import UserData from './UserData'
import Users from './Users'

const test = (state = 'will test', action) => {
  switch (action.type) {
    case 'test':
      return 'testing'
      break;
    default:
      return state
  }
}

const rootReducer = combineReducers({
  test,
  IsAdmin,
  AuthStatus,
  UserData,
  Users
})

export default rootReducer
