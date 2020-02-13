const DeletingTour = (state = null, action) => {
  switch (action.type) {
    case 'DELETING_TOUR':
      return action.payload
      break;
    default:
      return state
  }
}

export default DeletingTour
