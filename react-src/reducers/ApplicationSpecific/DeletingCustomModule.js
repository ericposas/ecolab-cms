const DeletingCustomModule = (state = null, action) => {
  switch (action.type) {
    case 'DELETING_CUSTOM_MODULE':
      return action.payload
      break;
    default:
      return state
  }
}

export default DeletingCustomModule
