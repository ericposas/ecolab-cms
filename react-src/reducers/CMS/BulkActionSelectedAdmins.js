const BulkActionSelectedAdmins = (state = [], action) => {
  switch (action.type) {
    case 'CLEAR_SELECTED_ADMIN_FOR_BULK_ACTION':
      return []
    case 'SELECT_ADMIN_FOR_BULK_ACTION':
      return state.concat(action.payload)
      break;
    case 'DESELECT_ADMIN_FOR_BULK_ACTION':
      return state.filter(item => item !== action.payload)
      break;
    default:
      return state
  }
}

export default BulkActionSelectedAdmins
