const CustomModules = (state = [], action) => {
  switch (action.type) {
    case 'SET_CUSTOM_MODULES':
      return action.payload
      break;
    default:
      return state
  }
}

export default CustomModules
