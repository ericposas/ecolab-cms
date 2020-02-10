const GettingSegments = (state = null, action) => {
  switch (action.type) {
    case 'GETTING_SEGMENTS':
      return action.payload
      break;
    default:
      return state
  }
}

export default GettingSegments
