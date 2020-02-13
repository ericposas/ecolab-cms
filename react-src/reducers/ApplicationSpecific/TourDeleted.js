const TourDeleted = (state = null, action) => {
  switch (action.type) {
    case 'TOUR_DELETED':
      return action.payload
      break;
    default:
      return state
  }
}

export default TourDeleted
