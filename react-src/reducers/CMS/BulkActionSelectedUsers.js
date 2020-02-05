const BulkActionSelectedUsers = (state = [], action) => {
  switch (action.type) {
    case 'CLEAR_SELECTED_USERS_FOR_BULK_ACTION':
      return []
    case 'SELECT_USER_FOR_BULK_ACTION':
      return state.concat(action.payload)
      break;
    case 'DESELECT_USER_FOR_BULK_ACTION':
      return state.filter(item => item !== action.payload)
      break;
    default:
      return state
  }
}

export default BulkActionSelectedUsers
