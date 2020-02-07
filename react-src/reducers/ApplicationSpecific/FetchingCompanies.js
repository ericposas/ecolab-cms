const GettingCompanies = (state = null, action) => {
  switch (action.type) {
    case 'GETTING_COMPANIES':
      return action.payload
      break;
    default:
      return state
  }
}

export default GettingCompanies
