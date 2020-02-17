const UpdatingWebModule = (state = null, action) => {
  switch (action.type) {
    case 'UPDATING_WEB_MODULE':
      return action.payload
      break;
    default:
      return state
  }
}

export default UpdatingWebModule
