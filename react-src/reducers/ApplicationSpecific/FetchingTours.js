const GettingTours = (state = null, action) => {
  switch (action.type) {
    case 'GETTING_TOURS':
      return action.payload
      break;
    default:
      return state
  }
}

export default GettingTours
