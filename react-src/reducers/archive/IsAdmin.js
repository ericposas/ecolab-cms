const IsAdmin = (state = false, action) => {
  switch (action.type) {
    case 'ADMIN_STATUS':
      return action.payload
      break;
    default:
      return state
  }
}

export default IsAdmin
