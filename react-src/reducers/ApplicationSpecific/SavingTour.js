const SavingTour = (state = null, action) => {
  switch (action.type) {
    case 'SAVING_TOUR':
      return action.payload
      break;
    default:
      return state
  }
}

export default SavingTour
