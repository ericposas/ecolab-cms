const TourSelectedForEdit = (state = null, action) => {
  switch (action.type) {
    case 'SELECTED_TOUR_TO_EDIT':
      return action.payload
      break;
    default:
      return state
  }
}

export default TourSelectedForEdit
