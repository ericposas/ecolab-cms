const CompanyUpdated = (state = null, action) => {
  switch (action.type) {
    case 'COMPANY_UPDATED':
      return action.payload
      break;
    default:
      return state
  }
}

export default CompanyUpdated
