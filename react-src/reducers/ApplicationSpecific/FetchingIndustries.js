const GettingIndustries = (state = null, action) => {
  switch (action.type) {
    case 'GETTING_INDUSTRIES':
      return action.payload
      break;
    default:
      return state
  }
}

export default GettingIndustries
