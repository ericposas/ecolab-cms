const TourToDelete = (state = null, action) => {
  switch (action.type) {
    case 'SET_TOUR_TO_DELETE':
      return action.payload
      break;
    default:
      return state
  }
}

export default TourToDelete
