const AppUserData = (state = {}, action) => {
  switch (action.type) {
    case 'SET_APP_USER_DATA':
      return action.payload
      break;
    default:
      return state
  }
}

export default AppUserData
