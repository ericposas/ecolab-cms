const RetrievingWebModule = (state = null, action) => {
  switch (action.type) {
    case 'RETRIEVING_WEB_MODULE':
      return action.payload
      break;
    default:
      return state
  }
}

export default RetrievingWebModule
