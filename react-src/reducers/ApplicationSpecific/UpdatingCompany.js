const UpdatingCompany = (state = null, action) => {
  switch (action.type) {
    case 'UPDATING_COMPANY':
      return action.payload
      break;
    default:
      return state
  }
}

export default UpdatingCompany
