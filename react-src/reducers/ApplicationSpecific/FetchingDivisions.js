const GettingDivisions = (state = null, action) => {
  switch (action.type) {
    case 'GETTING_DIVISIONS':
      return action.payload
      break;
    default:
      return state
  }
}

export default GettingDivisions
