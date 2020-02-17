const CustomModuleDeleted = (state = null, action) => {
  switch (action.type) {
    case 'CUSTOM_MODULE_DELETED':
      return action.payload
      break;
    default:
      return state
  }
}

export default CustomModuleDeleted
