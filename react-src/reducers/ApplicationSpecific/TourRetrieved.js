const RetrievingTour = (state = null, action) => {
  switch (action.type) {
    case 'RETRIEVING_TOUR':
      return action.payload
      break;
    default:
      return state
  }
}

export default TourRetrieved
