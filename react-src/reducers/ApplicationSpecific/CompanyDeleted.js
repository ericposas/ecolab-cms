const CompanyDeleted = (state = null, action) => {
  switch (action.type) {
    case 'COMPANY_DELETED':
      return action.payload
      break;
    default:
      return state
  }
}

export default CompanyDeleted
