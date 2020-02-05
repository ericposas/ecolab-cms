const WebModuleDeleted = (state = null, action) => {
  switch (action.type) {
    case 'WEB_MODULE_DELETED':
      return action.payload
      break;
    default:
      return state
  }
}

export default WebModuleDeleted
