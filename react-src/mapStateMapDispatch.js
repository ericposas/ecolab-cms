import { bindActionCreators } from 'redux'
import { AUTH_STATUS, USER_DATA, ADMIN_STATUS, SET_USERS } from './constants/User'

const mapState = state => {
  const { AuthStatus, UserData, IsAdmin, Users } = state
  return { AuthStatus, UserData, IsAdmin, Users }
}

const mapDispatch = dispatch => bindActionCreators({
  setAuthStatus: bool => ({ type: AUTH_STATUS, payload: bool }),
  setUserData: (name, email) => ({ type: USER_DATA, payload: { name, email } }),
  setAdminStatus: bool => ({ type: ADMIN_STATUS, payload: bool }),
  setUsers: users => ({ type: SET_USERS, payload: users })
}, dispatch)

export {
  mapState,
  mapDispatch
}
