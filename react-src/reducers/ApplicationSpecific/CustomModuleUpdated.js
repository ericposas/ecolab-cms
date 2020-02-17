const CustomModuleUpdated = (state = null, action) => {
  switch (action.type) {
    case 'CUSTOM_MODULE_UPDATED':
      return action.payload
      break;
    default:
      return state
  }
}

export default CustomModuleUpdated
