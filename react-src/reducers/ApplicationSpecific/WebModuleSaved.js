const WebModuleSaved = (state = null, action) => {
  switch (action.type) {
    case 'WEB_MODULE_SAVED':
      return action.payload
      break;
    default:
      return state
  }
}

export default WebModuleSaved
