const TourRetrieved = (state = null, action) => {
  switch (action.type) {
    case 'TOUR_RETRIEVED':
      return action.payload
      break;
    default:
      return state
  }
}

export default TourRetrieved
