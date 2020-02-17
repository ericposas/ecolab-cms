const RetrievingCustomModule = (state = null, action) => {
  switch (action.type) {
    case 'RETRIEVING_CUSTOM_MODULE':
      return action.payload
      break;
    default:
      return state
  }
}

export default RetrievingCustomModule
