const CompanyDataError = (state = null, action) => {
  switch (action.type) {
    case 'COMPANY_DATA_ERROR':
      return action.payload
      break;
    default:
      return state
  }
}

export default CompanyDataError
