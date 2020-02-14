const TourUpdated = (state = null, action) => {
  switch (action.type) {
    case 'TOUR_UPDATED':
      return action.payload
      break;
    default:
      return state
  }
}

export default TourUpdated
