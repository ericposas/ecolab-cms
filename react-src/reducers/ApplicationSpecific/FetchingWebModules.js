const GettingWebModules = (state = null, action) => {
  switch (action.type) {
    case 'GETTING_WEB_MODULES':
      return action.payload
      break;
    default:
      return state
  }
}

export default GettingWebModules
