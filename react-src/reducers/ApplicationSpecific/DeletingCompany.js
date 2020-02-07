const DeletingCompany = (state = null, action) => {
  switch (action.type) {
    case 'DELETING_COMPANY':
      return action.payload
      break;
    default:
      return state
  }
}

export default DeletingCompany
