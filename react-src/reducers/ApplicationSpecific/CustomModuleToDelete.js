const CustomModuleToDelete = (state = null, action) => {
  switch (action.type) {
    case 'SET_CUSTOM_MODULE_TO_DELETE':
      return action.payload
      break;
    default:
      return state
  }
}

export default CustomModuleToDelete
