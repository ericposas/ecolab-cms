const Industries = (state = [], action) => {
  switch (action.type) {
    case 'SET_INDUSTRIES':
      return action.payload
      break;
    default:
      return state
  }
}

export default Industries
