const WebModules = (state = null, action) => {
  switch (action.type) {
    case 'SET_WEB_MODULES':
      return action.payload
      break;
    default:
      return state
  }
}

export default WebModules
