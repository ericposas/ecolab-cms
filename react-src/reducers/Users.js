const Users = (state = null, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload
      break;
    default:
      return state
  }
}

export default Users
