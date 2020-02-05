const SelectedAdminForEditing = (state = null, action) => {
  switch (action.type) {
    case 'SET_SELECTED_ADMIN_FOR_EDITING':
      return action.payload
      break;
    default:
      return state
  }
}

export default SelectedAdminForEditing
