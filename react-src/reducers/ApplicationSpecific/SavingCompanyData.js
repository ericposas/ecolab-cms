const SavingCompanyData = (state = null, action) => {
  switch (action.type) {
    case 'SAVING_COMPANY_DATA_TO_DB':
      return action.payload
      break;
    default:
      return state
  }
}

export default SavingCompanyData
