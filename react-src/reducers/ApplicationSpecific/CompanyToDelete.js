const CompanyToDelete = (state = null, action) => {
  switch (action.type) {
    case 'SET_COMPANY_TO_DELETE':
      return action.payload
      break;
    default:
      return state
  }
}

export default CompanyToDelete
