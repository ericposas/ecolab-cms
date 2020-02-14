const Segments = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEGMENTS':
      return action.payload
      break;
    default:
      return state
  }
}

export default Segments
