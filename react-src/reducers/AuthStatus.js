const AuthStatus = (state = false, action) => {
  switch (action.type) {
    case 'AUTH_STATUS':
      return action.payload
      break;
    default:
      return state
  }
}

export default AuthStatus
