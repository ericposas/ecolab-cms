const WebModuleSelectedForEdit = (state = null, action) => {
  switch (action.type) {
    case 'SELECTED_WEB_MODULE_TO_EDIT':
      return action.payload
      break;
    default:
      return state
  }
}

export default WebModuleSelectedForEdit
