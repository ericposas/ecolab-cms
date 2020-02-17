const UpdatingCustomModule = (state = null, action) => {
  switch (action.type) {
    case 'UPDATING_CUSTOM_MODULE':
      return action.payload
      break;
    default:
      return state
  }
}

export default UpdatingCustomModule
