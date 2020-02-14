const Divisions = (state = [], action) => {
  switch (action.type) {
    case 'SET_DIVISIONS':
      return action.payload
      break;
    default:
      return state
  }
}

export default Divisions
