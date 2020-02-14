const UpdatingTour = (state = null, action) => {
  switch (action.type) {
    case 'UPDATING_TOUR':
      return action.payload
      break;
    default:
      return state
  }
}

export default UpdatingTour
