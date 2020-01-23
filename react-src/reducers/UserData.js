const UserData = (state = {}, action) => {
  switch (action.type) {
    case 'USER_DATA':
      return action.payload
      break;
    default:
      return state
  }
}

export default UserData
