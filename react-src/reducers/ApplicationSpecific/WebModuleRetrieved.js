const WebModuleRetrieved = (state = null, action) => {
  switch (action.type) {
    case 'WEB_MODULE_RETRIEVED':
      return action.payload
      break;
    default:
      return state
  }
}

export default WebModuleRetrieved
