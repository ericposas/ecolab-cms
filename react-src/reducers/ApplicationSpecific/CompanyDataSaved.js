const CompanyDataSaved = (state = null, action) => {
  switch (action.type) {
    case 'COMPANY_DATA_SAVED':
      return action.payload
      break;
    default:
      return state
  }
}

export default CompanyDataSaved
