const AdminData = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ADMIN_DATA':
      return action.payload
      break;
    default:
      return state
  }
}

export default AdminData
