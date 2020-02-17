const CustomModuleSelectedForEdit = (state = null, action) => {
  switch (action.type) {
    case 'SELECTED_CUSTOM_MODULE_TO_EDIT':
      return action.payload
      break;
    default:
      return state
  }
}

export default CustomModuleSelectedForEdit
