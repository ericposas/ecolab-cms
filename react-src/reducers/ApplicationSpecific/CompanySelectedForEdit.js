const CompanySelectedForEdit = (state = null, action) => {
  switch (action.type) {
    case 'SELECTED_COMPANY_TO_EDIT':
      return action.payload
      break;
    default:
      return state
  }
}

export default CompanySelectedForEdit
