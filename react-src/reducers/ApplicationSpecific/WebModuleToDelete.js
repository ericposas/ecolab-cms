const WebModuleToDelete = (state = null, action) => {
  switch (action.type) {
    case 'SET_WEB_MODULE_TO_DELETE':
      return action.payload
      break;
    default:
      return state
  }
}

export default WebModuleToDelete
