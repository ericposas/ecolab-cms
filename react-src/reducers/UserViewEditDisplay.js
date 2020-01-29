const UserViewEditDisplay = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_USER_EDIT_VIEW':
      return true
      break;
    case 'HIDE_USER_EDIT_VIEW':
      return false
      break;
    default:
      return state
  }
}

export default UserViewEditDisplay
