import { bindActionCreators } from 'redux'
import actions from './actions/ActionCreators'
// import { AUTH_STATUS, USER_DATA, ADMIN_STATUS, SET_USERS } from './constants/User'

const mapState = state => {
  const { UserData, Users } = state
  return { UserData, Users }
}

const mapDispatch = dispatch => bindActionCreators(actions, dispatch)

export {
  mapState,
  mapDispatch
}
