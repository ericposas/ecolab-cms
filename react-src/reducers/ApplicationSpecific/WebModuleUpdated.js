const WebModuleUpdated = (state = null, action) => {
  switch (action.type) {
    case 'WEB_MODULE_UPDATED':
      return action.payload
      break;
    default:
      return state
  }
}

export default WebModuleUpdated
