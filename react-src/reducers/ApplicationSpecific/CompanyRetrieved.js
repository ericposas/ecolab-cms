const CompanyRetrieved = (state = null, action) => {
  switch (action.type) {
    case 'COMPANY_RETRIEVED':
      return action.payload
      break;
    default:
      return state
  }
}

export default CompanyRetrieved
