import { USER_DATA, SET_USERS } from '../constants/User'

const setUserData = (auth, admin, name, email) => ({ type: USER_DATA, payload: { auth, admin, name, email } })
const setUsers = users => ({ type: SET_USERS, payload: users })

export default {
  setUserData,
  setUsers,
}
