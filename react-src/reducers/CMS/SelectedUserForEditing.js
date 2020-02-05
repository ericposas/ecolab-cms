const SelectedUserForEditing = (state = null, action) => {
  switch (action.type) {
    case 'SET_SELECTED_USER_FOR_EDITING':
      return action.payload
      break;
    default:
      return state
  }
}

export default SelectedUserForEditing
