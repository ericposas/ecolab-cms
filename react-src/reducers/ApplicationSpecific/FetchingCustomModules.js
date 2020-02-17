const GettingCustomModules = (state = null, action) => {
  switch (action.type) {
    case 'GETTING_CUSTOM_MODULES':
      return action.payload
      break;
    default:
      return state
  }
}

export default GettingCustomModules
