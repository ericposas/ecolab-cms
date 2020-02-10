const Segments = (state = null, action) => {
  switch (action.type) {
    case 'SET_SEGMENTS':
      return action.payload
      break;
    default:
      return state
  }
}

export default Segments
