const DeletingWebModule = (state = null, action) => {
  switch (action.type) {
    case 'DELETING_WEB_MODULE':
      return action.payload
      break;
    default:
      return state
  }
}

export default DeletingWebModule
